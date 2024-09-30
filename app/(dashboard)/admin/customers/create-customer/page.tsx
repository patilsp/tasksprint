"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomerForm from "@/components/CustomerForm";

const CreateCustomer = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);

  // Initial customer state with relevant fields
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    status: "",
    dateofbirth: "",
    area: "",
    pincode: "",
  });

  const createCustomer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/customer/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: customer.name,
          email: customer.email,
          address: customer.address,
          phone: customer.phone,
          status: customer.status,
          dateofbirth: customer.dateofbirth,
          area: customer.area,
          pincode: customer.pincode,
        }),
      });

      if (response.ok) {
        toast.success("Customer has been created! 🔥");
        router.push("/admin/customers");
      } else {
        toast.error("Failed to create customer.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomerForm
      type="Create"
      customer={customer}
      setCustomer={setCustomer}
      submitting={submitting}
      handleSubmit={createCustomer}
    />
  );
};

export default CreateCustomer;
