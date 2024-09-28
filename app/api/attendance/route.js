import Attendance from "@/models/attendance";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const attendanceRecords = await Attendance.find();
    return new Response(JSON.stringify(attendanceRecords), { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    return new Response("Failed to fetch attendance records", { status: 500 });
  }
};
