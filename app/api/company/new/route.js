import Company from "@/models/company";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { name, email, phone, address,  status, location, pincode, description } = await request.json();

  try {
    // Connect to the database
    await connectToDB();

    // Create a new company instance
    const newCompany = new Company({ 
      name, 
      email, 
      phone, 
      address, 
      status, 
      location, 
      pincode, 
      description 
    });

    // Save the company to the database
    await newCompany.save();

    // Respond with the created company
    return new Response(JSON.stringify(newCompany), { status: 201 });
  } catch (error) {
    // Log the error and send a failure response
    console.error('Error creating company:', error);
    return new Response("Failed to create a new company", { status: 500 });
  }
};
