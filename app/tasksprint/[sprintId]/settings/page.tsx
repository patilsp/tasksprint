 "use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { SprintSettings } from "@/components/sprint-settings"
import { useSprintStore } from "@/store/useSprintStore"
import { Loader2,ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"


export default function SprintSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const sprintId = params.sprintId as string
  const { currentSprint, fetchSprint, loading } = useSprintStore()
  
  const handleBack = () => {
    router.push("/tasksprint")
  }

  useEffect(() => {
    if (sprintId) {
      fetchSprint(sprintId)
    }
  }, [sprintId, fetchSprint])

  if (loading || !currentSprint) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading sprint settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">   
      <div className="container mx-auto">
      <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40"
        >
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
              <Link href="/" target="_blank"className="flex item-center">
                <Image src="/images/logo.png" height={35} width={35} alt="logo" className="object-contain" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskSprint
                </span>
              </Link>
              </div>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sprints
              </Button>
            </div>

          
          </div>
        </motion.header>
        <div className="max-w-3xl mx-auto">       
          <SprintSettings sprint={currentSprint} />
        </div>
      </div>
    </div>
  )
}