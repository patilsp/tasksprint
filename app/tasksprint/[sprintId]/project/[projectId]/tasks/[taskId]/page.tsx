"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, User, MessageSquare, Loader2 } from "lucide-react";
import { format } from "date-fns";

// Dummy data for activities
const DUMMY_ACTIVITIES = [
  {
    id: 1,
    type: "update",
    user: "John Doe",
    action: "updated the status to",
    value: "In Progress",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 2,
    type: "comment",
    user: "Jane Smith",
    action: "commented",
    value: "Let's prioritize this task for the next sprint",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 3,
    type: "assign",
    user: "Mike Johnson",
    action: "assigned the task to",
    value: "Sarah Wilson",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
];

// Dummy data for comments
const DUMMY_COMMENTS = [
  {
    id: 1,
    user: "John Doe",
    avatar: "/avatars/john.png",
    content: "I've started working on this task. Will update the progress soon.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "/avatars/jane.png",
    content: "Great work! Let me know if you need any help with the implementation.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
];

export default function TaskDetailsPage() {
  const params = useParams();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(DUMMY_COMMENTS);
  const [activities, setActivities] = useState(DUMMY_ACTIVITIES);

  useEffect(() => {
    // TODO: Fetch task details
    setLoading(false);
  }, [params.taskId]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: "Current User",
      avatar: "/avatars/default.png",
      content: comment,
      timestamp: new Date(),
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Task Details Section (60%) */}
        <div className="w-[60%] space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold">Task Title</h1>
                  <Badge variant="outline">In Progress</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Due: {format(new Date(), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Estimated: 4 hours
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Assigned to: John Doe
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Priority: High
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-muted-foreground">
                    This is a detailed description of the task. It includes all the necessary information
                    about what needs to be done, how it should be done, and any other relevant details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-2"
                />
                <Button type="submit">Post Comment</Button>
              </form>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{comment.user}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(comment.timestamp, "MMM dd, h:mm a")}
                        </span>
                      </div>
                      <p className="mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Load More Comments
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Activities Section (40%) */}
        <div className="w-[40%]">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Activity</h2>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>{activity.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{activity.user}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(activity.timestamp, "MMM dd, h:mm a")}
                        </span>
                      </div>
                      <p className="mt-1">
                        {activity.action}{" "}
                        {activity.type === "update" && (
                          <Badge variant="secondary">{activity.value}</Badge>
                        )}
                        {activity.type === "comment" && (
                          <span className="text-muted-foreground">
                            "{activity.value}"
                          </span>
                        )}
                        {activity.type === "assign" && (
                          <span className="font-medium">{activity.value}</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Load More Activities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 