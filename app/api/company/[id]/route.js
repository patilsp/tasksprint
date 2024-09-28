import Company from "@/models/company";
import { connectToDB } from "@/utils/database";

// GET: Fetch a company by its ID
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const company = await Company.findById(params.id);
        if (!company) return new Response("Company Not Found", { status: 404 });

        return new Response(JSON.stringify(company), { status: 200 });
    } catch (error) {
        console.error("Error fetching company details:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

// PATCH: Update a company by its ID
export const PATCH = async (request, { params }) => {
    if (!params.id) {
        return new Response("Company ID is missing", { status: 400 });
    }

    const { name, email, phone, address, dateOfEstablishment, status, location, pincode, description } = await request.json();

    if (!name || !email || !phone || !address || !status || !location || !pincode || !description || !industry) {
        return new Response("Missing required fields", { status: 400 });
    }

    try {
        await connectToDB();
        const existingCompany = await Company.findById(params.id);
        if (!existingCompany) {
            return new Response("Company not found", { status: 404 });
        }

        // Update company details
        existingCompany.name = name;
        existingCompany.email = email;
        existingCompany.phone = phone;
        existingCompany.address = address;
        existingCompany.dateOfEstablishment = dateOfEstablishment;
        existingCompany.status = status;
        existingCompany.location = location;
        existingCompany.pincode = pincode;
        existingCompany.description = description;
        existingCompany.industry = industry;

        await existingCompany.save();
        return new Response("Successfully updated the company", { status: 200 });
    } catch (error) {
        console.error("Error updating company:", error);
        return new Response("Error updating company", { status: 500 });
    }
};

// DELETE: Delete a company by its ID
export const DELETE = async (request, { params }) => {
    console.log("Request Parameters:", params); // Log the parameters

    try {
        await connectToDB();

        const companyId = params.id; // Extract the ID from params

        if (!companyId) {
            return new Response("Company ID is required", { status: 400 });
        }

        const result = await Company.findByIdAndDelete(companyId);

        if (!result) {
            return new Response("Company Not Found", { status: 404 });
        }

        return new Response("Company deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting company:", error);
        return new Response("Error deleting company", { status: 500 });
    }
};
