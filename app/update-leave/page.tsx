"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LeaveForm from "@/components/LeaveForm";
import toast from "react-hot-toast";

const UpdateLeave = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leaveId = searchParams.get("id");

  const [leave, setLeave] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      const response = await fetch(`/api/leave/${leaveId}`);
      const data = await response.json();
      setLeave(data);
    };

    if (leaveId) fetchLeaveDetails();
  }, [leaveId]);

  const updateLeave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/leave/${leaveId}`, {
        method: "PATCH",
        body: JSON.stringify(leave),
      });

      if (response.ok) {
        toast.success("Leave request updated successfully! 🔥");
        router.push("/leaves");
      } else {
        throw new Error("Failed to update leave request");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LeaveForm
      type="Update"
      leave={leave}
      setLeave={setLeave}
      submitting={submitting}
      handleSubmit={updateLeave}
    />
  );
};

export default UpdateLeave;
