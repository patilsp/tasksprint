"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EmployeeForm from "@/components/employee-form";

const UpdateEmployee = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    jobTitle: "",
    status: "",
    image: "",
    address: "",
    city: "",
    state: "",
    role: ""
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getEmployeeDetails = async () => {
      if (!employeeId) return;
      const response = await fetch(`/api/employee/${employeeId}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
      } else {
        console.error("Failed to fetch employee details");
      }
    };

    getEmployeeDetails();
  }, [employeeId]);

  const updateEmployee = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!employeeId) {
      alert("Missing employeeId!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/employee/${employeeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.error(errorData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Failed to update employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EmployeeForm
      type='Edit'
      employee={employee}
      setEmployee={setEmployee}
      submitting={submitting}
      handleSubmit={updateEmployee}
    />
  );
};

export default UpdateEmployee;
