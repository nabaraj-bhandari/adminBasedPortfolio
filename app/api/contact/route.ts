import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";
import { EmailService } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Save to database
    const contactMessage = await dbOperations.createContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (!contactMessage) {
      return NextResponse.json(
        { error: "Failed to save message. Please try again later." },
        { status: 500 }
      );
    }

    // Log the message
    console.log("📧 New Contact Message Saved:");
    console.log(`ID: ${contactMessage._id}`);
    console.log(`From: ${contactMessage.name} (${contactMessage.email})`);
    console.log(`Subject: ${contactMessage.subject}`);
    console.log(`Time: ${new Date(contactMessage.createdAt).toLocaleString()}`);
    console.log("---");

    // Send email notifications (don't fail the request if email fails)
    const emailData = {
      name: contactMessage.name,
      email: contactMessage.email,
      subject: contactMessage.subject,
      message: contactMessage.message,
      timestamp: contactMessage.createdAt || new Date().toISOString(),
    };

    // Send notification to admin
    EmailService.sendContactNotificationToAdmin(emailData).catch((error) => {
      console.error("Failed to send admin notification:", error);
    });

    // Send auto-reply to user
    EmailService.sendContactAutoReply(emailData).catch((error) => {
      console.error("Failed to send auto-reply:", error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        id: contactMessage._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// GET method to retrieve contact messages (for admin use)
export async function GET() {
  try {
    const messages = await dbOperations.getContactMessages();
    return NextResponse.json(
      {
        success: true,
        messages,
        count: messages.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
