import Leave from "@/models/leave";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const { employeeName, leaveType, startDate, endDate, reason, status } = await request.json();
  const leaveId = params.id;

  try {
    await connectToDB();
    const existingLeave = await Leave.findById(leaveId);

    if (!existingLeave) {
      return new Response("Leave not found", { status: 404 });
    }

    existingLeave.employeeName = employeeName;
    existingLeave.leaveType = leaveType;
    existingLeave.startDate = startDate;
    existingLeave.endDate = endDate;
    existingLeave.reason = reason;
    existingLeave.status = status || existingLeave.status;

    await existingLeave.save();

    return new Response(JSON.stringify(existingLeave), { status: 200 });
  } catch (error) {
    console.error('Error updating leave request:', error);
    return new Response("Failed to update leave request", { status: 500 });
  }
};
