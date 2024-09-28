"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from "react-hot-toast"
import axios from 'axios'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'

const Register = () => {
  const router = useRouter()
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!state.email || !state.password || !state.name) {
      toast.error("Please fill all fields")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/register', state)
      const data = await response.data
      toast.success(data.msg)
      setState({
        name: '',
        email: '',
        password: ''
      })
      router.push('/login')
    } catch (error: any) {
      toast.error(error?.response?.data?.error)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url(/images/bg/bg.png)" }}>
      <div className="absolute"></div>
      <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-transparent shadow-lg border border-white backdrop:blur-xl">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create a new account to get started.</CardDescription>
          </CardHeader>
          <form onSubmit={onSubmitHandler}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={state.name}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={state.email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={state.password}
                    onChange={onChangeHandler}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}> 
                {loading ? (
                   <span className="flex items-center justify-center">
                   <Loader2 className="animate-spin h-5 w-5 mr-3" /> Registering...
                 </span>
                ) : (
                  "Register"
                )}
              </Button>
              <p className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline text-blue-500 hover:text-blue-700">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Register
