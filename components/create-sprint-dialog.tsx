"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TaskSprintForm from '@/components/TaskSprintForm'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface CreateSprintDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSprintDialog({ open, onOpenChange }: CreateSprintDialogProps) {
  const router = useRouter()
  const { user, fetchUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(true)
  const [submitting, setIsSubmitting] = useState(false)

  const [taskSprint, setTaskSprint] = useState({
    name: '',
    description: '',
    startDate: '',
    dueDate: '',
    priority: '',
    status: '',
    project: '',
  })

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await fetchUser()
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching user:', error)
        toast.error('Failed to load user data')
        setIsLoading(false)
      }
    }

    if (open) {
      initializeUser()
    }
  }, [open, fetchUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user?._id) {
      toast.error('User data not available. Please try again.')
      return
    }

    if (!taskSprint.project) {
      toast.error('Please select a project')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/tasksprint/new', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          ...taskSprint,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create task sprint')
      }

      toast.success('Your Sprint has been created! 🎉')
      onOpenChange(false)
      router.push('/tasksprint')
    } catch (error) {
      toast.error(`Failed to create task sprint! ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isLoading && !submitting) {
      onOpenChange(false)
    }
  }

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog className="bg-gradient-to-br from-blue-50 via-white to-purple-50" open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle>Create New Sprint</DialogTitle>
                <DialogDescription>
                  Set up a new sprint to organize your team's work and track progress.
                </DialogDescription>
              </DialogHeader>

              <TaskSprintForm
                type='Create'
                sprint={taskSprint}
                setSprint={setTaskSprint}
                submitting={submitting}
                handleSubmit={handleSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
} 