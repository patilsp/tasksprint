"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Home, ChevronRight, User, Settings, CreditCard, Bell, LogOut, Shield, Mail, Phone } from "lucide-react"

export default function UserProfile() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("settings")

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
     
        <main className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Home size={16} />
                <ChevronRight size={16} />
                <span>Account</span>
                <ChevronRight size={16} />
                <span>Settings</span>
              </div>
              <CardTitle className="text-2xl font-bold">Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-1/3">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-semibold">Max Smith</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User size={16} />
                      <span>Developer</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Mail size={16} />
                      <span>max@example.com</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button className="w-full">Edit Profile</Button>
                    <Button variant="outline" className="w-full">View Public Profile</Button>
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Profile Details</h4>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Max" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Smith" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="max@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="pst">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pst">(GMT-8:00) Pacific Time</SelectItem>
                            <SelectItem value="est">(GMT-5:00) Eastern Time</SelectItem>
                            <SelectItem value="utc">(GMT+0:00) UTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Email Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notifications" />
                        <Label htmlFor="notifications">Receive email notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" />
                        <Label htmlFor="newsletter">Receive newsletter</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}