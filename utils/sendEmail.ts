import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteEmail(to: string, inviteLink: string) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to,
      subject: "You're invited to join a Sprint on TaskSprint!",
      html: `
        <div style="font-family: sans-serif;">
          <h2>🚀 You're Invited!</h2>
          <p>Someone invited you to join their sprint on <b>TaskSprint</b>.</p>
          <p>
            Click the button below to accept the invite:
          </p>
          <a href="${inviteLink}" target="_blank" style="padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">
            Accept Invite
          </a>
          <p>If the button doesn't work, use this link:</p>
          <p><a href="${inviteLink}">${inviteLink}</a></p>
          <p>– The TaskSprint Team</p>
        </div>
      `,
    });

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
