'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import AttendanceForm from '@/components/AttendanceForm'
import { useUserStore } from '@/store/useUserStore'
import { CheckCircle, Clock, ListChecks, UserCheck } from 'lucide-react';

export function AttendanceDialog() {
  const router = useRouter()
  
  const { user, fetchUser } = useUserStore()
  const [attendance, setAttendance] = useState({
    status: 'Present',
    remarks: '',
    date: new Date(),
    checkInTime: new Date(),
    userId: '', 
  })

  const [submitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

  // Update userId when user changes
  useEffect(() => {
    if (user?._id) {
      setAttendance(prev => ({ ...prev, userId: user._id }))
    }
  }, [user])

  const createAttendance = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?._id) {
        toast.error('You must be logged in to mark attendance');
        return;
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/attendance/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance),
      })

      if (response.ok) {
        toast.success('You have successfully marked today\'s attendance! ✅');
        router.reload();  
        setOpen(false)
      } else {
        throw new Error('Failed to create attendance record')
      }
    } catch (error) {
      toast.error(`Failed to create attendance record! ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-red-400 text-white p-1 text-center">
        {/* <Button className="w-full mt-4 bg-gray-950 hover:bg-black">Mark Attendance</Button> */}
        <Button variant="link" className="text-sm text-white border border-gray-200 rounded-md px-2 py-1 gap-2"> <Clock className="h-3 w-3 text-sm mr-1" />Login for the day</Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center" >Mark your Attendance</DialogTitle>
        </DialogHeader>
        <AttendanceForm
          type='Create'
          attendance={attendance}
          setAttendance={setAttendance}
          submitting={submitting}
          handleSubmit={createAttendance}
        />
      </DialogContent>
    </Dialog>
  )
}
