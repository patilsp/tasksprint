import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KanbanCard from "./KanbanCard";

export default function KanbanColumn({ title, tasks, onUpdate, onDelete, employees, projects }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <KanbanCard 
            key={task._id} 
            task={task} 
            onUpdate={onUpdate} 
            onDelete={onDelete}
            employees={employees}
            projects={projects}
          />
        ))}
      </CardContent>
    </Card>
  );
}