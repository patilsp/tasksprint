"use client"

import Link from "next/link"
import React, { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/useAuthStore"

const Login = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState({
    email: "",
    password: "",
  })

  const { user, login, isLoading, logout } = useAuthStore()



  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(state.email, state.password)
      router.push("/welcome")
    } catch (error) {
      // Error is handled in the store
    }
  }

  
  // if (user?._id) {
  //     toast.error('You have logged in already');
  //     return;
  // }

  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url(/images/bg/bg.png)" }}>
      <div className="w-full h-screen flex items-center justify-center px-4">
        <Card className="mx-auto max-w-md bg-transparent shadow-lg border border-white backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmitHandler} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="demo@gmail.com" required onChange={onChangeHandler} value={state.email} />
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
                  className="absolute right-3 top-10 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-3" /> Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <div className="mt-5 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline text-blue-500 hover:text-blue-700">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login