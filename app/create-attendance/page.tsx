"use client";

import { useState } from 'react';
import AttendanceForm from '@/components/AttendanceForm';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CreateAttendance = () => {
  const router = useRouter();
  const [attendance, setAttendance] = useState({
    employeeId: '',
    date: '',
    status: 'Present',
    remarks: '',
  });
  const [submitting, setIsSubmitting] = useState(false);

  const createAttendance = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/attendance/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance),
      });

      if (response.ok) {
        toast.success('Attendance has been created! 🔥');
        router.push('/attendance');
      } else {
        throw new Error('Failed to create attendance record');
      }
    } catch (error) {
      toast.error(`Failed to create attendance record! ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AttendanceForm
      type='Create'
      attendance={attendance}
      setAttendance={setAttendance}
      submitting={submitting}
      handleSubmit={createAttendance}
    />
  );
};

export default CreateAttendance;
