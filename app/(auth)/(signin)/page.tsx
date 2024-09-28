"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Lottie from"lottie-react";
import animationData from "@/assets/animation1.json";


export default function AuthenticationPage() {
  const [quote, setQuote] = useState({ post_title: '', post_content: '' });

  // Function to fetch all posts and select a random quote
  const fetchQuote = async () => {
    try {
      const response = await fetch('/api/post');
      if (response.ok) {
        const posts = await response.json();
        if (posts.length > 0) {
          const randomIndex = Math.floor(Math.random() * posts.length);
          setQuote(posts[randomIndex]);
        } else {
          setQuote({ post_title: "No quotes available", post_content: "" });
        }
      } else {
        console.error('Failed to fetch posts');
        setQuote({ post_title: "Failed to fetch quote", post_content: "" });
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setQuote({ post_title: "Error fetching quote", post_content: "" });
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      fetchQuote();
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        {/* <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src="/images/logo.png"
            height={50}
            width={50}
            alt="logo"
            className="object-contain"
          />
        </div>

         <div className="relative z-20 flex items-center mt-20 mb-5">
          <Image
            src="/images/svg/8.svg"
            height={420}
            width={420}
            alt="banner"
            className="object-contain"
          />
        </div> */}

              <div className="block"> 
                <Lottie animationData={animationData} /> 
              </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {quote.post_title && quote.post_content ? (
              <>
                <footer className="text-sm">— {quote.post_title}</footer> 
                <p className="text-lg">&ldquo;{quote.post_content}&rdquo;</p>
                
              </>
            ) : (
              <p>Loading quote...</p>
            )}
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[430px] sm:border sm:rounded-md sm:shadow-md md:border-none md:rounded-none md:shadow-none p-2">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login your account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to get started.
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
