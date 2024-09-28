import Leave from "@/models/leave";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const leaves = await Leave.find({})

        return new Response(JSON.stringify(leaves), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all leaves", { status: 500 })
    }
} 

