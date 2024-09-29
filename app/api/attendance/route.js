import Attendance from "@/models/attendance";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        // Get the userId from the query parameters
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return new Response("User ID is required", { status: 400 });
        }

        // Fetch attendances for the specific user
        const attendances = await Attendance.find({ creator: userId }).sort({ date: -1 });

        if (!attendances.length) {
            return new Response("No attendance records found for this user", { status: 404 });
        }

        return new Response(JSON.stringify(attendances), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Failed to fetch attendances:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        await connectToDB();

        const { userId, status, remarks } = await request.json();

        if (!userId || !status) {
            return new Response("User ID and status are required", { status: 400 });
        }

        const newAttendance = new Attendance({
            creator: userId,
            date: new Date(),
            status,
            checkInTime: new Date(),
            remarks: remarks || ""
        });

        await newAttendance.save();

        return new Response(JSON.stringify(newAttendance), { 
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Failed to create attendance:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}