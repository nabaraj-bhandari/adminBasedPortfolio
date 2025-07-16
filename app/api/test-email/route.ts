import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check - in production you'd want proper auth
    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Test email configuration
    const success = await EmailService.testEmailConfiguration();

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Test email sent successfully! Check your admin email.",
      });
    } else {
      return NextResponse.json(
        {
          error: "Failed to send test email. Check your email configuration.",
          details:
            "Make sure SENDGRID_API_KEY and ADMIN_EMAIL are set correctly.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Email test error:", error);
    return NextResponse.json(
      { error: "Failed to test email configuration" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Email Test Endpoint",
    instructions: [
      "Send a POST request with your admin password to test email configuration",
      "Make sure to set SENDGRID_API_KEY and ADMIN_EMAIL in your .env.local",
      "The test will send an email to your admin email address",
    ],
    required_env_vars: [
      "SENDGRID_API_KEY",
      "ADMIN_EMAIL",
      "FROM_EMAIL (optional, defaults to noreply@yourwebsite.com)",
    ],
  });
}
