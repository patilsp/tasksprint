import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { name, email, phone, address, dateofbirth, status, area, pincode } = await request.json();
   
    try {
      await connectToDB();
      const newCustomer = new Customer({ name, email, phone, address, dateofbirth, status, area, pincode });

      await newCustomer.save();
      
      return new Response(JSON.stringify(newCustomer), { status: 201 });
    } catch (error) {
 
      return new Response(
        JSON.stringify({ error: "Failed to create a new customer" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
  
  