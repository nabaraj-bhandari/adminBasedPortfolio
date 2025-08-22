import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";
import { EmailService } from "@/lib/email-service";
import { withErrorHandler, withValidation } from "@/lib/api-middleware";
import { z } from "zod";

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required")
});

export const POST = withErrorHandler(
  withValidation(contactSchema, async (request: NextRequest, data) => {
    // Save to database
    const contactMessage = await dbOperations.createContactMessage({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    });

    if (!contactMessage) {
      return NextResponse.json(
        { error: "Failed to save message. Please try again later." },
        { status: 500 }
      );
    }

    // Log the message
    console.log("📧 New Contact Message Saved:", {
      id: contactMessage._id,
      from: `${contactMessage.name} (${contactMessage.email})`,
      subject: contactMessage.subject,
      time: new Date(contactMessage.createdAt).toLocaleString()
    });

    // Send email notifications (don't fail the request if email fails)
    const emailData = {
      name: contactMessage.name,
      email: contactMessage.email,
      subject: contactMessage.subject,
      message: contactMessage.message,
      timestamp: contactMessage.createdAt || new Date().toISOString(),
    };

    // Send notification to admin
    EmailService.sendContactNotificationToAdmin(emailData).catch((err: Error) => {
      console.error("Failed to send admin notification:", err);
    });

    // Send auto-reply to user
    EmailService.sendContactAutoReply(emailData).catch((err: Error) => {
      console.error("Failed to send auto-reply:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        id: contactMessage._id,
      },
      { status: 200 }
    );
  })
);

// GET method to retrieve contact messages (for admin use)
export const GET = withErrorHandler(async () => {
  const messages = await dbOperations.getContactMessages();
  return NextResponse.json(
    {
      success: true,
      messages,
      count: messages.length
    },
    { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    }
  );
});
