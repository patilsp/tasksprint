"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  profilePicture: z.any().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const [user, setUser] = useState<ProfileFormValues | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      urls: [{ value: "" }],
    },
    mode: "onChange",
  })

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/profile")
      const data = response.data?.user
      setUser(data)
      if (data) {
        form.reset({
          username: data.username,
          email: data.email,
          bio: data.bio,
          urls: data.urls || [{ value: "" }],
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to fetch profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmit(data: ProfileFormValues) {
    try {
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (key === 'urls') {
          formData.append(key, JSON.stringify(data[key]))
        } else if (key === 'profilePicture' && data[key][0]) {
          formData.append(key, data[key][0])
        } else {
          formData.append(key, data[key])
        }
      })

      await axios.post("/api/profile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update profile",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full flex justify-start mx-auto border shadow-none" >
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-center">
                          <Avatar className="w-32 h-32 mb-4">
                            <AvatarImage src={user?.profilePicture || ""} alt="Profile picture" />
                            <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name. It can be your real name or a
                        pseudonym. You can only change this once every 30 days.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">m@example.com</SelectItem>
                          <SelectItem value="m@google.com">m@google.com</SelectItem>
                          <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage verified email addresses in your{" "}
                        <Link href="/examples/forms">email settings</Link>.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations to
                    link to them.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`urls.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        URLs
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add links to your website, blog, or social media profiles.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: "" })}
              >
                Add URL
              </Button>
            </div>
            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}