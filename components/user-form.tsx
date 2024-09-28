"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

// Validation schema using Zod
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  role: z.enum(["user", "admin", "hr", "manager", "developer", "tester"]),
  profileImage: z.string().url(), // Ensuring profile image is a valid URL
  bio: z.string(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  type: string;
  submitting: boolean;
  handleSubmit: (values: UserFormValues) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({
  type,
  submitting,
  handleSubmit,
}) => {
  const { data: session } = useSession();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: session?.user?.name || "",  
      email: session?.user?.email || "", 
      profileImage: session?.user?.image || "", // Getting the profile image from the session
      phone: "",
      role: "",
      bio: "",
    },
  });

  return (
    <section className="flex items-center justify-center min-h-screen bg-white border-slate-100 dark:bg-black dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
      <div className="w-full mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome,  <span className="text-blue-600">{session?.user?.name || "User"}</span>
        </h1>
        <p className="text-center text-gray-600 mb-8">
          You've successfully logged in with GitHub!
        </p>
        <p className="text-center text-gray-600 mb-8">
          Now, please complete your profile to finish setting up your account in Taskprint. To get full access to your dashboard, project management, and attendance tracking.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-10 w-full flex flex-col gap-7 glassmorphism"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john doe"
                    {...form.register("username")}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.username?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...form.register("email")}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+919876543210" {...form.register("phone")} />
                </FormControl>
                <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={(value) => form.setValue("role", value)}
                  defaultValue="user"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="tester">Tester</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage>{form.formState.errors.role?.message}</FormMessage>
              </FormItem>
            </div>

            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write about yourself in short"
                  {...form.register("bio")}
                />
              </FormControl>
            </FormItem>

            {/* Hidden input for profile image */}
            <input
              type="hidden"
              {...form.register("profileImage")}
            />

            <div className="flex justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full md:w-auto bg-red-400 hover:bg-red-500 text-white hover:text-white"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto"
              >
                {submitting ? `${type}ing...` : type}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default UserForm;
