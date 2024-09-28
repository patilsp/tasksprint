
import React from 'react'
import { Search, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const leaveData = [
  { id: 1, type: 'Casual', from: '19 Feb 2020 - 9:00 AM', to: '19 Feb 2020 - 6:00 PM', days: '1d', reason: "Friend's wedding celebration", status: 'Pending' },
  { id: 2, type: 'Casual', from: '19 Feb 2020 - 9:00 AM', to: '19 Feb 2020 - 6:00 PM', days: '1d', reason: "Friend's wedding celebration", status: 'Cancelled' },
  { id: 3, type: 'Casual', from: '19 Feb 2020 - 9:00 AM', to: '19 Feb 2020 - 6:00 PM', days: '1d', reason: "Friend's wedding celebration", status: 'Approved' },
  { id: 4, type: 'Casual', from: '19 Feb 2020 - 9:00 AM', to: '19 Feb 2020 - 6:00 PM', days: '1d', reason: "Friend's wedding celebration", status: 'Declined' },
  { id: 5, type: 'Casual', from: '19 Feb 2020 - 9:00 AM', to: '19 Feb 2020 - 6:00 PM', days: '1d', reason: "Friend's wedding celebration", status: 'Pending' },
]

export default function LeavesDashboard() {
  return (
    <div className="container mx-auto p-4 scroll">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Leaves</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-24">
            <span className="text-3xl font-bold text-blue-500">16</span>
            <span className="text-sm text-gray-500">Available leaves</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-24">
            <span className="text-3xl font-bold text-blue-500">08</span>
            <span className="text-sm text-gray-500">Previous unused leaves</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-24">
            <span className="text-3xl font-bold text-yellow-500">02</span>
            <span className="text-sm text-gray-500">Pending Leaves Requests</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-24">
            <span className="text-3xl font-bold text-red-500">02</span>
            <span className="text-sm text-gray-500">Rejected Leaves</span>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mb-6">
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <span className="text-blue-500 mr-2">ⓘ</span>
              <span>You were absent on 13 Apr 2020</span>
            </div>
            <div>
              <Button variant="outline" className="mr-2">Apply On Duty</Button>
              <Button className='bg-indigo-400 text-white'>Apply leave</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <span>Your compensatory off will expire on 31 Apr 2020</span>
            <div>
              <Button variant="link" className="mr-2">Read leave policy</Button>
              <Button className='bg-red-400 text-white'>Apply leave</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Leaves</h2>
          <Button>New Request</Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Leave Type or Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
              <SelectItem value="vacation">Vacation</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" className="w-[200px]" placeholder="From Date" />
          <Input type="date" className="w-[200px]" placeholder="To Date" />
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Clear</Button>
          <Button>Filter</Button>
        </div>

        <div className="overflow-x-auto mb-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SNo</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveData.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.id}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.from}</TableCell>
                  <TableCell>{leave.to}</TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      leave.status === 'Declined' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {leave.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">Showing 1 to 5 of 50 entries</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">10</Button>
            <Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  )
}