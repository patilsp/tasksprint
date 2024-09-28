"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CompanyForm from "@/components/CompanyForm";

const CreateCompany = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);

  const [company, setCompany] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    status: "Active",
    location: "",
    pincode: "",
    description: "",
    industry: "",
    address: "",
    pincode: "",
  });

  const createCompany = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/company/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: company.name,
          email: company.email,
          address: company.address,
          phone: company.phone,
          status: company.status,
          location: company.location,
          pincode: company.pincode,
          description: company.description,
          industry: company.industry,
          address: company.address,
          pincode: company.pincode,
        }),
      });

      if (response.ok) {
        toast.success("Company has been created! 🔥");
        router.push("/companies");
      } else {
        toast.error("Failed to create company.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CompanyForm
      type="Create"
      company={company}
      setCompany={setCompany}
      submitting={submitting}
      handleSubmit={createCompany}
    />
  );
};

export default CreateCompany;
