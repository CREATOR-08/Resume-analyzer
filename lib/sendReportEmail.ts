import { resend } from "./resend";

interface SendReportEmailProps {
  email: string;
  name?: string;
  pdfUrl: string;
}

export async function sendReportEmail({
  email,
  name,
  pdfUrl,
}: SendReportEmailProps) {
  return await resend.emails.send({
    from: "ResumeLens <onboarding@resend.dev>",
    to: email,
    subject: "Your Resume Analysis Report",
    html: `
      <div style="font-family:sans-serif">
        <h2>Hello ${name || "there"} 👋</h2>

        <p>Your resume analysis has been completed.</p>

        <p>
          Download your report:
        </p>

        <a href="${pdfUrl}">
          Download PDF Report
        </a>

        <br/><br/>

        <p>Thank you for using ResumeLens.</p>
      </div>
    `,
  });
}