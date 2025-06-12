"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomerForm from "@/components/CustomerForm";
import toast from 'react-hot-toast';

const UpdateCustomer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateofbirth: "",
    status: "",
    area: "",
    pincode: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getCustomerDetails = async () => {
      try {
        const response = await fetch(`/api/customer/${customerId}`); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomer(data); 
      } catch (error) {
        toast.error("Failed to fetch customer details.");
      }
    };

    if (customerId) getCustomerDetails();
  }, [customerId]);

  const updateCustomer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!customerId) {
      toast.error("Missing Customer ID!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/customer/${customerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.message || "Customer has been updated! 🔥");
        router.push("/customers");
      } else {
        throw new Error(responseData.message || "Failed to update customer");
      }
    } catch (error) {
      toast.error(`Failed to update customer! ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomerForm
      type="Edit"
      customer={customer} 
      setCustomer={setCustomer} 
      submitting={submitting}
      handleSubmit={updateCustomer}
    />
  );
};

export default UpdateCustomer;
