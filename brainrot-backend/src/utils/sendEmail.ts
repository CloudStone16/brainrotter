import { Resend } from "resend";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to,
      subject,
      html,
    });

    console.log("Email sent:", data);
  } catch (error: any) {
    console.error("Email send error:", error);
    throw new Error("Email could not be sent");
  }
};
