import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, LayoutDashboard, CheckSquare, Calendar, Settings, HelpCircle, BarChart2, DollarSign, FileText, Users, UserPlus, ChevronDown } from 'lucide-react'
import { EmployeeNav } from '@/components/layout/employee-nav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 flex items-center space-x-2">
        <div className="hidden lg:block">
          <Link
            href="/dashboard"
            target="_blank"
          >
            <Image 
              src="/images/logo.png"
              height={35}
              width={35}
              alt="logo"
              className="object-contain"             

            />           
          </Link>
        </div>
          <span className="font-semibold text-lg">Task Sprint</span>
        </div>
        <nav className="mt-8">
          <div className="px-4 mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">MAIN MENU</h2>
            <ul className="mt-2 space-y-2">
              <li><Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md     bg-gray-100"><LayoutDashboard className="mr-3 h-5 w-5" />Dashboard</Link></li>
              <li><Link href="/tasks" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><CheckSquare className="mr-3 h-5 w-5" />Tasks</Link></li>
              <li><Link href="/calendar" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><Calendar className="mr-3 h-5 w-5" />Calendar</Link></li>
              <li><Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><Settings className="mr-3 h-5 w-5" />Settings</Link></li>
              <li><Link href="/help" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><HelpCircle className="mr-3 h-5 w-5" />Help & Center</Link></li>
            </ul>
          </div>
          <div className="px-4 mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">TEAM MANAGEMENT</h2>
            <ul className="mt-2 space-y-2">
              <li><Link href="/performance" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><BarChart2 className="mr-3 h-5 w-5" />Performance</Link></li>
              <li><Link href="/payrolls" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><DollarSign className="mr-3 h-5 w-5" />Payrolls</Link></li>
              <li><Link href="/invoices" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><FileText className="mr-3 h-5 w-5" />Invoices</Link></li>
              <li><Link href="/employees" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><Users className="mr-3 h-5 w-5" />Employees</Link></li>
              <li><Link href="/hiring" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><UserPlus className="mr-3 h-5 w-5" />Hiring</Link></li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-2 px-2 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input type="text" placeholder="Search anything..." className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-300" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
           
              <div className="flex items-center -space-x-2 ">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/avatars/02.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/avatars/03.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center text-xs font-medium text-gray-600">
                  +15
                </div>
              </div>
              <Button variant="outline" size="sm">
                Invite <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
                <EmployeeNav />
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout