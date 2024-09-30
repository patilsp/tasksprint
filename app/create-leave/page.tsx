"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LeaveForm from "@/components/LeaveForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
        toast.success("Leaves requested successfully! 🔥");
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
    <div className="bg-gray-100">
       <div className="flex justify-start items-center pt-3 ml-2">
          <Link href="/leaves">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>
      <LeaveForm
        type="Submit"
        leave={leave}
        setLeave={setLeave}
        submitting={submitting}
        handleSubmit={createLeave}
      />
    </div>
  );
};

export default CreateLeave;
