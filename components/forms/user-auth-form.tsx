"use client"
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react" 
import GoogleSignInButton from '../github-auth-button';

const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) 
  const router = useRouter()
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!state.email || !state.password) {
        toast.error("Please fill all fields");
        return;
      }

      setIsLoading(true);
      const response = await axios.post('/api/login', state);
      const data = await response.data;
      toast.success(data.msg);

      router.push("/welcome");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="bg-background flex items-center justify-center px-0 md:px-4">
        <Card className="w-full max-w-2xl shadow-none border-none">
          <CardContent>
            <form onSubmit={onSubmitHandler} className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="demo@example.com"
                  onChange={onChangeHandler}
                  value={state.email}
                />
              </div>
              <div className="grid gap-2 relative">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forget-password" className="text-sm text-blue-500 hover:text-blue-600">
                    Forget Password
                  </Link>
                </div>
                <Input
                  onChange={onChangeHandler}
                  value={state.password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            
              <div className="flex justify-between gap-2">
                {/* <GoogleSignInButton /> */}
                {/* <Button variant="outline" className="w-full">
                  Google
                </Button> */}
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline hover:text-blue-600">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

export default UserAuthForm

