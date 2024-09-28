'use client'

import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import AttendanceForm from '@/components/AttendanceForm'
import { useUserStore } from '@/store/useUserStore'

export function AttendanceDialog() {
  const router = useRouter()
  
  const { user, fetchUser } = useUserStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const [attendance, setAttendance] = useState({
    status: 'Present',
    remarks: '',
    date: new Date(),
    checkInTime: new Date(),
    userId: user?._id
  })
  const [submitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

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
        toast.success('Attendance has been created! 🔥')
        router.push('/attendance')
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
      <DialogTrigger asChild>
        <Button className="w-full mt-4 bg-gray-950 hover:bg-black">Mark Attendance</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Attendance</DialogTitle>
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