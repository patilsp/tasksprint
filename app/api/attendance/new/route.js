import Attendance from "@/models/attendance";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const {userId, date, checkInTime, checkOutTime, status, remarks } = await request.json();

  try {
    await connectToDB();
    const newAttendance = new Attendance({ creator: userId, date, checkInTime, checkOutTime, status, remarks });
    await newAttendance.save();

    return new Response(JSON.stringify(newAttendance), { status: 201 });
  } catch (error) {
    console.error('Error creating attendance:', error);
    return new Response("Failed to create a new attendance record", { status: 500 });
  }
};
