"use client"
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


const ForgetPassword = ({searchParams:{token}}:any) => {
  const router = useRouter()
  const [state,setSate] = useState({    
      password:'',
      cpassword:''
  });


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setSate({...state,[e.target.name]:e.target.value})
    }

    const onSUbmitHandler = async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      try {

        if(!state.password || !state.cpassword ){
          toast.error("please fill all fields");
          return
        }

          const response = await axios.put('/api/update-password',{...state,token:token});
          const data = await response.data;
          toast.success(data.msg);

          router.push("/dashboard");
      } catch (error:any) {
          toast.error(error.response.data.error);
      }
    }

  return (
    <>
   <section className="themes-wrapper container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forget Password</CardTitle>
          <CardDescription>Create a new password to get started.</CardDescription>
        </CardHeader>
        
      <CardContent className="space-y-4">
      <div className="p-1 w-full">
      
        <form onSubmit={onSUbmitHandler}>
        
          <div className="relative mb-4">
            <Label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</Label>
            <Input onChange={onChangeHandler} value={state.password} type="password" id="password" name="password" className="" />
          </div>
          <div className="relative mb-4">
            <Label htmlFor="cpasssowrd" className="leading-7 text-sm text-gray-600">Confirm password</Label>
            <Input onChange={onChangeHandler} value={state.cpassword} type="text" id="cpasssowrd" name="cpassword" className="" />
          </div>
          
            <div className="flex justify-between items-center">
             
              <p className="text-xs text-gray-500 mt-3">
              Already Know ? <Link className="text-blue-500"  href={'/login'}>Login?</Link>
              </p>
              <Button className="">Forget Password</Button>
            </div>
        </form>
      </div>
      </CardContent>
    </Card>
    </section>

    </>
  )
}

export default ForgetPassword