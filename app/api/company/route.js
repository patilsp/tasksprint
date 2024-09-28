import Company from "@/models/company";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const companies = await Company.find({})

        return new Response(JSON.stringify(companies), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all companies", { status: 500 })
    }
} 