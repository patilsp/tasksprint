import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {CommandMenu} from '@/components/command-menu'


export default function Header() {



  const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago",
    },
    {
      title: "You have a new message!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
    },
  ]


  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex w-full max-w-sm md:max-w-full h-14 items-center justify-between px-4">
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
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
        <CommandMenu />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button variant="ghost" className="p-1 rounded-md border-input bg-transparent border shadow-sm hover:bg-accent hover:text-slate-900 ">                
                    <Bell className="bell dark:text-white hover:fill-black dark:hover:fill-white" size={20}  />
                    {/* <UnreadMessageCount /> */}
                  </button>
                </DropdownMenuTrigger>      
                <DropdownMenuContent className="w-100" align="end" forceMount>
                <Card className="w-[380px] border-0 shadow-none">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>You have 3 unread messages.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                      <Bell />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Push Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Send notifications to device.
                        </p>
                      </div>
                      
                    </div>
                    <div>
                      {notifications.map((notification, index) => (
                        <div
                          key={index}
                          className="mt-1 grid grid-cols-[25px_1fr] items-start p-2 last:mb-0 last:pb-0 hover:bg-gray-200 rounded"
                        >
                          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Check className="mr-2 h-4 w-4" /> Mark all as read
                    </Button>
                  </CardFooter>
                </Card>
              </DropdownMenuContent>
            </DropdownMenu>
          
          <ThemeToggle />
          <UserNav />

        </div>
      </nav>
    </div>
  );
}
