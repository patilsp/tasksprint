import InviteUserDialog from "@/components/InviteUserDialog"

export default function SprintPage({ sprintId }: { sprintId: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Sprint Dashboard</h1>
      <InviteUserDialog sprintId={sprintId} />
    </div>
  )
}
