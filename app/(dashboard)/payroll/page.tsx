import React from 'react'
import { Search, Bell, ChevronDown, Download, Plus, MoreHorizontal, Eye } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";
import { BarGraph } from './components/charts/bar-graph'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PayrollForm from './components/PayrollForm'
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator  } from "@/components/ui/dropdown-menu"
import { InviteUser } from './components/invite-user'

const payrollData = [
  { id: 'PYRL120124', name: 'Hazel Nutt', role: 'Lead UI/UX Designer', date: '21 Jun, 2024 - 05:05 pm', salary: 2500.00, reimbursement: 500.00, status: 'Completed' },
  { id: 'PYRL120124', name: 'Simon Cyrene', role: 'Sr. UI/UX Designer', date: '21 Jun, 2024 - 05:03 pm', salary: 2300.00, reimbursement: 100.00, status: 'Completed' },
  { id: 'PYRL120124', name: 'Alda Bugg', role: 'Jr. Graphics Designer', date: '21 Jun, 2024 - 05:01 pm', salary: 2000.00, reimbursement: 1000.00, status: 'Pending' },
  { id: 'PYRL120124', name: 'Peg Legge', role: 'Jr. Animator', date: '21 Jun, 2024 - 05:00 pm', salary: 2100.00, reimbursement: 500.00, status: 'Pending' },
  { id: 'PYRL120124', name: 'Simon Cyrene', role: 'Sr. UI/UX Designer', date: '21 Jun, 2024 - 05:03 pm', salary: 2300.00, reimbursement: 100.00, status: 'Completed' },
]

export default function PayrollDashboard() {
  return (
    <div className="w-full">
      <header className="bg-white border-b border-gray-200 px-4 py-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Payrolls</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input type="search" placeholder="Search anything..." className="pl-10 pr-4 py-2 w-64 rounded-md border-gray-300" />
          </div>
          
          <div className="flex items-center -space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png?height=32&width=32" alt="User" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/02.png?height=32&width=32" alt="User" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/03.png?height=32&width=32" alt="User" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div className="bg-gray-200 -space-x-1 rounded-full h-8 w-8 flex items-center justify-center text-xs font-medium text-gray-600">
              +15
            </div>
          </div>
          {/* <Button variant="outline" size="sm" className="text-gray-700">
            Invite <ChevronDown className="ml-1 h-4 w-4" />
          </Button> */}
          <InviteUser />
        </div>
      </header>

      <main className="p-1">
        <div className="bg-green-50 border-2 border-green-500 p-1 mb-6 rounded-lg shadow">
          <p className="text-green-800 text-sm font-semibold flex justify-between">
            A payroll submission for the current pay period is due in 2 days. review and finalize all employee payroll details.
            <Button variant="link" className="text-green-800 font-semibold p-0 h-auto">MORE DETAILS</Button>
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Select defaultValue="01 July - 31 July 2024">
            <SelectTrigger className="w-[240px] bg-white">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01 July - 31 July 2024">01 July - 31 July 2024</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button variant="outline" className="bg-white">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Payroll
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[400px]  md:w-[625px] sm:scroll">
                  <PayrollForm />
                </DialogContent>
              </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Payrolls Cost</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between space-x-4">           
              <div className="text-2xl font-bold">$12,500</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500">↑ 20%</span> last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Expense</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between space-x-4">  
              <div className="text-2xl font-bold">$2,560</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500">↑ 6.1%</span> last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending payments</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between space-x-4">  
              <div className="text-2xl font-bold">$4,700</div>
              <p className="text-xs text-gray-500">
                <span className="text-red-500">↓ 50</span> Total Employee
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Payrolls</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between space-x-4">  
              <div className="text-2xl font-bold">200</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500">↑ 16</span> New Employee
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2 bg-white border-none shadow-none">
            {/* <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Payroll Cost Overview</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-500">More details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">               
                <BarGraph />            
              </div>
            </CardContent> */}
             <BarGraph />
          </Card>
          
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Bonuses and Incentives</CardTitle>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                {/* Placeholder for donut chart */}
                <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                  <span className="text-2xl font-bold">$10,500</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <div className="font-medium">$5,100</div>
                  <div className="text-gray-500">Bonuses</div>
                </div>
                <div>
                  <div className="font-medium">$5,400</div>
                  <div className="text-gray-500">Incentives</div>
                </div>
              </div>
             
              <div className="flex justify-between text-sm mt-5">
                <div>
                  <div className="font-medium">$5,100</div>
                  <div className="text-gray-500">Bonuses</div>
                </div>
                <div>
                  <div className="font-medium">$5,400</div>
                  <div className="text-gray-500">Incentives</div>
                </div>
              </div>
              <Button variant="link" className="mt-4 w-full text-gray-700 border hover:bg-sky-200">More details</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <CardTitle className="text-lg font-semibold mb-4 md:mb-0">Payroll list</CardTitle>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input type="search" placeholder="Search Employee" className="pl-10 pr-4 py-2 rounded-md border-gray-300" />
                </div>
                <Select defaultValue="all-status">
                  <SelectTrigger className="w-[150px] bg-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-role">
                  <SelectTrigger className="w-[150px] bg-white">
                    <SelectValue placeholder="All Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-role">All Role</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Payroll ID</TableHead>
                  <TableHead>Employee name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Total Salary</TableHead>
                  <TableHead>Reimbursement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.map((payroll, index) => (
                  <TableRow key={index} className="border-b border-gray-200">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{payroll.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={payroll.name} />
                          <AvatarFallback>{payroll.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {payroll.name}
                      </div>
                    </TableCell>
                    <TableCell>{payroll.role}</TableCell>
                    <TableCell>{payroll.date}</TableCell>
                    <TableCell>$ {payroll.salary.toFixed(2)}</TableCell>
                    <TableCell>$ {payroll.reimbursement.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={payroll.status === 'Completed' ? 'default' : 'secondary'}
                             className={`${payroll.status === 'Completed' ? 'bg-green-100 text-green-400' : 'bg-yellow-100 text-yellow-800'} rounded-full px-2 py-1 text-xs`}>
                        {payroll.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-gray-500 border border-gray-200 mr-1">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {/* <Button variant="ghost" size="icon" className="text-gray-500 border border-gray-200">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button> */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 border border-gray-200"
                          >
                           <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            Delete
                          </DropdownMenuItem>
                         
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}