import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Invite from "@/models/Invite";
import { connectToDB } from "@/utils/database";
import { sendInviteEmail } from "@/utils/sendEmail";

export async function POST(req: NextRequest) {
  try {
    const { email, sprintId } = await req.json();
    await connectToDB();

    const token = uuidv4();
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;

    await Invite.create({
      email,
      sprintId,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h expiry
    });

    await sendInviteEmail(email, inviteLink);

    return NextResponse.json({ message: "Invite sent", inviteLink });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invite failed" }, { status: 500 });
  }
}
