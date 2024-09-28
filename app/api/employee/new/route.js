import Employee from "@/models/employee";
import { connectToDB } from "@/utils/database";

export async function POST(request) {
  try {
    const {
      firstName, lastName, email, phone, department, jobTitle, salary,
      status, image, address, city, state, role, userId
    } = await request.json();

    // Validate inputs
    if (!firstName || !lastName || !email || !phone) {
      return new Response(JSON.stringify({ message: "Required fields are missing" }), { status: 400 });
    }

    await connectToDB();

    const newEmployee = new Employee({
      firstName, lastName, email, phone, department, jobTitle,
      salary, status, image, address, city, state, role, creator: userId
    });

    const savedEmployee = await newEmployee.save();
    return new Response(JSON.stringify(savedEmployee), { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
