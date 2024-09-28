"use client"
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from "react-hot-toast"
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const ForgetPassword = () => {
  const router = useRouter()
  const [state, setState] = useState({
    email: ''
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!state.email) {
        toast.error("Please fill in all fields");
        return;
      }

      const response = await axios.post('/api/forget-password', state);
      const data = await response.data;
      toast.success(data.msg);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <>
     <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url(/images/bg/bg.png)" }}>
     <div className="absolute"></div>
      <div className="flex justify-center items-center min-h-screen p-4 ">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmitHandler} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="demo@example.com"
                  value={state.email}
                  onChange={onChangeHandler}
                />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-start">
            <p className="text-sm">
              Already know?{" "}
              <Link href="/login" className="underline text-blue-500 hover:text-blue-600">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      </div>
    </>
  );
}

export default ForgetPassword
