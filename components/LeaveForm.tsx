"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { format, differenceInDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function DatePicker({ selectedDate, onSelectDate, label }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-full justify-start text-left font-normal ${
              !selectedDate && "text-muted-foreground"
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const LeaveForm = ({ type, leave, setLeave, submitting, handleSubmit }) => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const data = response.data?.user;
      setUser(data);
      setLeave({ ...leave, employeeName: data.name });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch profile");
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (leave.startDate && leave.endDate) {
      const daysBetween = differenceInDays(new Date(leave.endDate), new Date(leave.startDate)) + 1;
      setLeave({ ...leave, days: daysBetween > 0 ? daysBetween : 0 });
    }
  }, [leave.startDate, leave.endDate]);

  const leaveTypes = ["Sick Leave", "Casual Leave", "Vacation", "Other"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
      <Card className="w-full max-w-lg shadow">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Leave Request</CardTitle>
           
          </div>
          <CardDescription>
            Please fill in the details for your leave request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingUser ? (
            <div className="flex justify-center items-center p-4">
              <Loader2 className="animate-spin mr-2" size={24} />
              <span>Loading user data...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  value={user?.name || leave.employeeName}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select
                  value={leave.leaveType}
                  onValueChange={(value) => setLeave({ ...leave, leaveType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  label="Start Date"
                  selectedDate={leave.startDate ? new Date(leave.startDate) : null}
                  onSelectDate={(date) =>
                    setLeave({ ...leave, startDate: date ? format(date, "yyyy-MM-dd") : "" })
                  }
                />
                <DatePicker
                  label="End Date"
                  selectedDate={leave.endDate ? new Date(leave.endDate) : null}
                  onSelectDate={(date) =>
                    setLeave({ ...leave, endDate: date ? format(date, "yyyy-MM-dd") : "" })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="days">Days</Label>
                <Input
                  id="days"
                  type="number"
                  value={leave.days}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a reason for your leave request"
                  value={leave.reason}
                  onChange={(e) => setLeave({ ...leave, reason: e.target.value })}
                  rows={4}
                />
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between gap-2">
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting || loadingUser}
            className="w-full"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Submitting...
              </>
            ) : (
              type
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LeaveForm;