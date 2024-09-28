import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Icons } from "@/components/icons";
import Link from "next/link";

const AttendanceForm = ({ type, attendance, setAttendance, submitting, handleSubmit }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status Selector */}
        <div className="grid gap-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
          <Select
            value={attendance.status}
            onValueChange={(value) => setAttendance({ ...attendance, status: value })}
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="Leave">Leave</SelectItem>
              <SelectItem value="Late">Late</SelectItem>
              <SelectItem value="Half Day">Half Day</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Remarks Input */}
        <div className="grid gap-2">
          <Label htmlFor="remarks" className="text-sm font-medium text-gray-700">Remarks</Label>
          <Textarea
            id="remarks"
            value={attendance.remarks}
            onChange={(e) => setAttendance({ ...attendance, remarks: e.target.value })}
            placeholder="Enter remarks (optional)"
            className="w-full h-24 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
         
          <Button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {submitting && (
              <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
            )}
            {submitting ? `${type}ing...` : type}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
