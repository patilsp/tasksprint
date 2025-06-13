"use client";

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { UserPlus } from "lucide-react"

export default function InviteUserDialog({ sprintId }: { sprintId: string }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const sendInvite = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        body: JSON.stringify({ email, sprintId }),
      })

      if (res.ok) {
        const data = await res.json()
        toast({ 
          title: "Success!", 
          description: `Invite sent to ${email}`,
          variant: "default"
        })
        setOpen(false) // Close the modal
        setEmail("") // Reset the email input
      } else {
        toast({ 
          title: "Error", 
          description: "Could not send invite",
          variant: "destructive"
        })
      }
    } catch (err) {
      toast({ 
        title: "Error", 
        description: "Something went wrong",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-semibold">Invite User to Sprint</h2>
        <Input
          placeholder="Enter user's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={sendInvite} disabled={loading}>
          {loading ? "Sending..." : "Send Invite"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
