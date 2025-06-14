import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const customer = await Customer.findById(params.id);
        if (!customer) return new Response("Customer Not Found", { status: 404 });

        return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
};


export const PATCH = async (request, { params }) => {
    
    if (!params.id) {
      return new Response("Customer ID is missing", { status: 400 });
    }
    const { name, email, phone, address, area, dateofbirth, status, pincode } = await request.json();
    
    if (!name || !email || !phone || !address || !status) {
      return new Response("Missing required fields", { status: 400 });
    }
    
    try {
      await connectToDB();
      const existingCustomer = await Customer.findById(params.id);
      if (!existingCustomer) {
        return new Response("Customer not found", { status: 404 });
      }
      
      existingCustomer.name = name;
      existingCustomer.email = email;
      existingCustomer.phone = phone;
      existingCustomer.address = address;
      existingCustomer.area = area;
      existingCustomer.dateofbirth = dateofbirth;
      existingCustomer.status = status;
      existingCustomer.pincode = pincode;
      
      await existingCustomer.save();
      return new Response("Successfully updated the Customer", { status: 200 });
    } catch (error) {
      return new Response("Error Updating Customer", { status: 500 });
    }
  };
  

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        const customerId = params.id;

        if (!customerId) {
            return new Response("Customer ID is required", { status: 400 });
        }

        const result = await Customer.findByIdAndDelete(customerId);

        if (!result) {
            return new Response("Customer Not Found", { status: 404 });
        }

        return new Response("Customer deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Customer", error);
    }
};


