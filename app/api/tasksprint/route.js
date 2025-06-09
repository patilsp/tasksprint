import TaskSprint from "@/models/tasksprint";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const tasksprints = await TaskSprint.find({})

        // Calculate stats
        const stats = {
            teamVelocity: tasksprints.reduce((acc, sprint) => acc + (sprint.tasks || 0), 0) / (tasksprints.length || 1),
            burndownEfficiency: tasksprints.reduce((acc, sprint) => acc + (sprint.completedTasks || 0), 0) / 
                              (tasksprints.reduce((acc, sprint) => acc + (sprint.tasks || 0), 0) || 1) * 100
        }

        return new Response(JSON.stringify({
            sprints: tasksprints,
            stats
        }), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('Error fetching sprints:', error)
        return new Response(JSON.stringify({ 
            message: "Failed to fetch all Sprints",
            error: error.message 
        }), { 
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
} 