import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const customers = await Customer.find({});

    return new Response(JSON.stringify(customers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {

    return new Response(
      JSON.stringify({ error: "Failed to fetch all customers" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
