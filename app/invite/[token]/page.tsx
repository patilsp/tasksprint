import Invite from "@/models/Invite";
import { connectToDB } from "@/utils/database";
import Sprint from "@/models/Sprint";
import { redirect } from "next/navigation";

export default async function InvitePage({ params }: { params: { token: string } }) {
  await connectToDB();
  const invite = await Invite.findOne({ token: params.token });

  if (!invite || invite.status === "accepted") {
    return <div>Invalid or expired invite.</div>;
  }

  // Optional: Add user to sprint
  await Sprint.findByIdAndUpdate(invite.sprintId, {
    $addToSet: { members: invite.email }, // Assuming you store member emails
  });

  invite.status = "accepted";
  await invite.save();

  // Redirect to sprint page
  redirect(`/sprint/${invite.sprintId}`);
}
