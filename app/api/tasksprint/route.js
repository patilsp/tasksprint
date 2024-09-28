import TaskSprint from "@/models/tasksprint";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const tasksprints = await TaskSprint.find({})

        return new Response(JSON.stringify(tasksprints), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Sprint", { status: 500 })
    }
} 