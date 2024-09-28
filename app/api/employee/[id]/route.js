import Employee from "@/models/employee";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const employee = await Employee.findById(params.id).populate("creator");
        if (!employee) return new Response("Employee Not Found", { status: 404 });

        return new Response(JSON.stringify(employee), { status: 200 });
    } catch (error) {
        console.error("Error fetching employee:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { firstName, lastName, email, phone, department, jobTitle, status, image, address, city, state, role } = await request.json();

    try {
        await connectToDB();

        const existingEmployee = await Employee.findById(params.id);

        if (!existingEmployee) {
            return new Response("Employee not found", { status: 404 });
        }

        // Update the employee with new data
        existingEmployee.firstName = firstName;
        existingEmployee.lastName = lastName;
        existingEmployee.email = email;
        existingEmployee.phone = phone;
        existingEmployee.department = department;
        existingEmployee.jobTitle = jobTitle;
        existingEmployee.status = status;
        existingEmployee.image = image;
        existingEmployee.address = address;
        existingEmployee.city = city;
        existingEmployee.state = state;
        existingEmployee.role = role;

        await existingEmployee.save();

        return new Response("Successfully updated the employee", { status: 200 });
    } catch (error) {
        console.error("Error updating employee:", error);
        return new Response("Error Updating Employee", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the employee by ID and remove it
        const result = await Employee.findByIdAndRemove(params.id);

        if (!result) {
            return new Response("Employee not found", { status: 404 });
        }

        return new Response("Employee deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return new Response("Error deleting employee", { status: 500 });
    }
};
