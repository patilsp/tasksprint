
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, CreditCard, LogOut } from 'lucide-react'
import { signOut , useSession } from 'next-auth/react';

export function UserNavNew() {
  const [user, setUser] = useState<{ name?: string; email?: string }>({})
  const router = useRouter()
  const { data: session, status } = useSession();
  console.log(status);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/profile")
      const data = response.data?.user
      setUser(data)
    } catch (error: any) {
      toast.error(error.response.data.error)
    }
  }

  const logoutUser = async () => {
    try {
      const { data } = await axios.get("/api/logout")
      toast.success(data.msg)
      setUser({})
      router.push("/login")
    } catch (error: any) {
      toast.error(error.response.data.error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    session ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt={user.name || "User avatar"} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          

          { status === 'authenticated' ? (
            <DropdownMenuItem onClick={() => signOut()} className="bg-black cursor-pointer rounded-lg text-white text-sm text-left">
              Log out
              <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={logoutUser}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          )
        }


        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <div className="flex items-center">
        <Link href="/login">
          <Button variant="ghost" className="text-sm">
            Login
          </Button>
        </Link>
      </div>
    )
  )
}
