import sgMail from "@sendgrid/mail";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface ContactNotificationData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export class EmailService {
  private static fromEmail =
    process.env.FROM_EMAIL || "noreply@yourwebsite.com";
  private static adminEmail =
    process.env.ADMIN_EMAIL || "admin@yourwebsite.com";

  /**
   * Send a general email
   */
  static async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn("SendGrid API key not configured. Email not sent.");
      return false;
    }

    try {
      const msg: sgMail.MailDataRequired = {
        to: options.to,
        from: this.fromEmail,
        subject: options.subject,
        text: options.text || "",
        html: options.html || options.text || "",
      };

      await sgMail.send(msg);
      console.log(`Email sent successfully to ${options.to}`);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  /**
   * Send notification to admin when new contact message is received
   */
  static async sendContactNotificationToAdmin(
    data: ContactNotificationData
  ): Promise<boolean> {
    const subject = `New Contact Message: ${data.subject}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Message Received</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Message Details</h3>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Received:</strong> ${new Date(
            data.timestamp
          ).toLocaleString()}</p>
        </div>
        
        <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h4 style="margin-top: 0; color: #333;">Message:</h4>
          <p style="line-height: 1.6; white-space: pre-wrap;">${
            data.message
          }</p>
        </div>
        
        <div style="margin-top: 20px; padding: 20px; background: #e8f4f8; border-radius: 8px;">
          <p style="margin: 0;"><strong>Reply directly to:</strong> ${
            data.email
          }</p>
          <p style="margin: 5px 0 0 0;"><small>Or log into your admin panel to manage this message.</small></p>
        </div>
      </div>
    `;

    const text = `
New Contact Message Received

From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Received: ${new Date(data.timestamp).toLocaleString()}

Message:
${data.message}

Reply directly to: ${data.email}
    `;

    return this.sendEmail({
      to: this.adminEmail,
      subject,
      text,
      html,
    });
  }

  /**
   * Send auto-reply confirmation to contact form submitter
   */
  static async sendContactAutoReply(
    data: ContactNotificationData
  ): Promise<boolean> {
    const subject = `Thank you for contacting us - ${data.subject}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank You for Your Message</h2>
        
        <p>Hi ${data.name},</p>
        
        <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Your Message</h3>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Sent:</strong> ${new Date(
            data.timestamp
          ).toLocaleString()}</p>
          <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 4px; margin-top: 10px;">
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${
              data.message
            }</p>
          </div>
        </div>
        
        <p>I typically respond within 24-48 hours. If your message is urgent, please don't hesitate to reach out again.</p>
        
        <p>Best regards,<br>
        <strong>Your Name</strong></p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          This is an automated confirmation. Please do not reply to this email.
        </p>
      </div>
    `;

    const text = `
Hi ${data.name},

Thank you for reaching out! I've received your message and will get back to you as soon as possible.

Your Message:
Subject: ${data.subject}
Sent: ${new Date(data.timestamp).toLocaleString()}

${data.message}

I typically respond within 24-48 hours. If your message is urgent, please don't hesitate to reach out again.

Best regards,
Your Name

---
This is an automated confirmation. Please do not reply to this email.
    `;

    return this.sendEmail({
      to: data.email,
      subject,
      text,
      html,
    });
  }

  /**
   * Test email configuration
   */
  static async testEmailConfiguration(): Promise<boolean> {
    if (!process.env.SENDGRID_API_KEY) {
      console.error("SendGrid API key not configured");
      return false;
    }

    if (!process.env.ADMIN_EMAIL) {
      console.error("Admin email not configured");
      return false;
    }

    try {
      return await this.sendEmail({
        to: this.adminEmail,
        subject: "Email Configuration Test",
        text: "This is a test email to verify your email configuration is working correctly.",
        html: "<p>This is a test email to verify your email configuration is working correctly.</p>",
      });
    } catch (error) {
      console.error("Email configuration test failed:", error);
      return false;
    }
  }
}
