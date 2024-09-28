"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AttendanceForm from '@/components/AttendanceForm';
import toast from 'react-hot-toast';

const UpdateAttendance = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const attendanceId = searchParams.get('id');

  const [attendance, setAttendance] = useState({
    employeeId: '',
    date: '',
    status: 'Present',
    remarks: '',
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getAttendanceDetails = async () => {
      try {
        const response = await fetch(`/api/attendance/${attendanceId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAttendance(data);
      } catch (error) {
        console.error('Failed to fetch attendance record:', error);
      }
    };

    if (attendanceId) getAttendanceDetails();
  }, [attendanceId]);

  const updateAttendance = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/attendance/${attendanceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance),
      });

      if (response.ok) {
        toast.success('Attendance record has been updated! 🔥');
        router.push('/attendance');
      } else {
        throw new Error('Failed to update attendance record');
      }
    } catch (error) {
      toast.error(`Failed to update attendance record! ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AttendanceForm
      type='Edit'
      attendance={attendance}
      setAttendance={setAttendance}
      submitting={submitting}
      handleSubmit={updateAttendance}
    />
  );
};

export default UpdateAttendance;
