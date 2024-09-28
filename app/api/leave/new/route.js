import Leave from "@/models/leave";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { employeeName, leaveType, startDate, endDate, reason, days } = await request.json();

  try {
    await connectToDB();
    const newLeave = new Leave({
      employeeName,
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'Pending',
      days,
    });

    await newLeave.save();
    return new Response(JSON.stringify(newLeave), { status: 201 });
  } catch (error) {
    console.error('Error creating leave request:', error);
    return new Response("Failed to create a new leave request", { status: 500 });
  }
};
