"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LeaveForm from "@/components/LeaveForm";

const CreateLeave = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [leave, setLeave] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    days: "",
  });

  const createLeave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leave/new", {
        method: "POST",
        body: JSON.stringify(leave),
      });

      if (response.ok) {
        toast.success("Leave request submitted successfully! 🔥");
        router.push("/leaves");
      } else {
        throw new Error("Failed to submit leave request");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LeaveForm
      type="Submit"
      leave={leave}
      setLeave={setLeave}
      submitting={submitting}
      handleSubmit={createLeave}
    />
  );
};

export default CreateLeave;
