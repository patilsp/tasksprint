"use client"
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react" 

const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) 
  const router = useRouter()
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
  }

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    // Custom validation messages
    if (!state.email) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!state.password) {
      newErrors.password = "Password cannot be empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails

    try {
      setIsLoading(true);
      const response = await axios.post('/api/login', state);
      const data = await response.data;

      router.push("/welcome");
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error.response.data.error // Set error based on server response
      }));
    } finally {
      setIsLoading(false);
    }
  }

  const handleFocus = (field: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the error when the input is focused
  }

  return (
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
                onFocus={() => handleFocus('email')}  // Remove error on focus
                value={state.email}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                onFocus={() => handleFocus('password')}  // Remove error on focus
                value={state.password}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="********"
                className={errors.password ? 'border-red-500' : ''}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="underline hover:text-blue-600">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default UserAuthForm
