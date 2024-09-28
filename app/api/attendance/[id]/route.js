import Attendance from "@/models/attendance";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const { id } = params;
  const { employeeId, date, status, remarks } = await request.json();

  try {
    await connectToDB();
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, { employeeId, date, status, remarks }, { new: true });
    
    if (!updatedAttendance) {
      return new Response("Attendance record not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedAttendance), { status: 200 });
  } catch (error) {
    console.error('Error updating attendance:', error);
    return new Response("Failed to update attendance record", { status: 500 });
  }
};


