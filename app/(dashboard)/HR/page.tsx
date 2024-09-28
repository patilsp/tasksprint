import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, MoreHorizontal } from 'lucide-react'

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Welcome back, Ali !</h2>
        <div className="flex items-center space-x-4">
          <Select defaultValue="01 July - 31 July 2024">
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01 July - 31 July 2024">01 July - 31 July 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180</div>
            <p className="text-xs text-muted-foreground">Total Jobs</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Jobs</span>
                <span className="text-sm font-medium">100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Interview Jobs</span>
                <span className="text-sm font-medium">50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Finish Jobs</span>
                <span className="text-sm font-medium">30</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">+20% since last month</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Sick Leave</span>
                <span className="text-sm font-medium">4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Day Off</span>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">On time</span>
                <span className="text-sm font-medium">84%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totals Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-green-500">+32 Fulltime Employee</p>
            <p className="text-xs text-orange-500">+18 Freelance Employee</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income Statistics</CardTitle>
            <Button variant="ghost" size="sm">More details</Button>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-center">
              {/* Placeholder for chart */}
              <div className="text-center text-gray-500">Income chart will be displayed here</div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <div className="text-2xl font-bold">$8,500.00</div>
                <p className="text-xs text-muted-foreground">Income</p>
              </div>
              <div>
                <div className="text-2xl font-bold">$3,280.00</div>
                <p className="text-xs text-muted-foreground">Expense</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employee Performance Ratings</CardTitle>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Most of employees complete their jobs and on time.</p>
            <p className="text-xs text-muted-foreground">Give rewards to increase employee satisfaction.</p>
            <div className="mt-4 space-y-2">
              {['Hazel Nutt', 'Simon Cyrene', 'Alda Bugg', 'Peg Legge', 'Barb Akew'].map((name, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/4 text-sm">{name}</div>
                  <div className="w-3/4 flex space-x-1">
                    <div className="h-2 bg-purple-500 rounded" style={{width: '40%'}}></div>
                    <div className="h-2 bg-blue-500 rounded" style={{width: '30%'}}></div>
                    <div className="h-2 bg-green-500 rounded" style={{width: '20%'}}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>Task completed</span>
              <span>Presence</span>
              <span>Completed Meeting</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">List Employee</CardTitle>
          <div className="flex items-center space-x-2">
            <Input type="text" placeholder="Search Employee" className="w-64" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Role</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Employee name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Departments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 'EMP120124', name: 'Hazel Nutt', email: 'hazelnutt@gmail.com', role: 'Lead UI/UX Designer', department: 'Team Projects', status: 'Full-time' },
                { id: 'EMP120124', name: 'Simon Cyrene', email: 'simoncyr@gmail.com', role: 'Sr. UI/UX Designer', department: 'Team Projects', status: 'Full-time' },
                { id: 'EMP120124', name: 'Alda Bugg', email: 'aldabugg@gmail.com', role: 'Jr. Graphics Designer', department: 'Team Marketing', status: 'Freelance' },
                { id: 'EMP120124', name: 'Peg Legge', email: 'peglegge@gmail.com', role: 'Jr. Animator', department: 'Team Marketing', status: 'Full-time' },
              ].map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/placeholder-avatar.jpg`} alt={employee.name} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {employee.name}
                    </div>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.status === 'Full-time' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage