"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EmployeeForm from "@/components/employee-form";
import axios from 'axios';

const CreateEmployee = () => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const router = useRouter()

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const data = response.data?.user;
      setUser(data); 
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch profile");
      setUser(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userId = user?._id || 1234;

  console.log(userId)

  const [submitting, setIsSubmitting] = useState(false);
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    jobTitle: "",
    salary: "",
    address: "",
    city: "",
    state: "",
    role: "Admin",
    status: "Active",
    image: "",
  });

  const createEmployee = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/employee/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          ...employee,
          salary: Number(employee.salary),
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.error("Error response:", data);
        toast.error(`Error: ${data.message || "Failed to create employee"}`);
        return;
      }
  
      toast.success("Employee has been created!");
      router.push("/admin/employees");
    } catch (error) {
      console.error("Catch error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-1 scroll my-10">
      <EmployeeForm
        type="Create"
        employee={employee}
        setEmployee={setEmployee}
        submitting={submitting}
        handleSubmit={createEmployee}
      />
    </div>
  );
};

export default CreateEmployee;
