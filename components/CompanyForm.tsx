"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";


const CompanyForm = ({ type, company, setCompany, submitting, handleSubmit }) => {
 
  const handleStatusChange = (value) => {
    setCompany({ ...company, status: value });
  };

  return (
    <section className="mb-5 flex w-full max-w-full flex-col items-center justify-center px-4 py-2">
      <h1 className="head_text mt-4 text-center text-xl text-indigo-500">
        {type} Company
      </h1>
      <form onSubmit={handleSubmit} className="glassmorphism1 mt-5 flex w-full max-w-2xl flex-col gap-4 rounded-lg border border-gray-200 p-8 shadow dark:bg-slate-900 dark:text-white md:w-3/4 lg:w-1/2">
       
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        
      <div className="grid w-full gap-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            placeholder="Enter company name"
            required
            className="input"
          />
        </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={company.status || "Active"} onValueChange={handleStatusChange}>
              <SelectTrigger className="line-clamp-1 w-full truncate">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Startup">Startup</SelectItem>
                <SelectItem value="Established">Established</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
          <div className="grid w-full gap-2">
            <Label htmlFor="email">Company Email</Label>
            <Input
              value={company.email}
              onChange={(e) => setCompany({ ...company, email: e.target.value })}
              placeholder="Enter company email"
              required
              className="input"
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              type="tel"
              pattern="[0-9]*"
              value={company.phone}
              onChange={(e) => setCompany({ ...company, phone: e.target.value })}
              placeholder="Enter company contact number"
              required
              className="input"
            />
          </div>
        </div>
       
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
          <div className="grid w-full gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              value={company.location}
              onChange={(e) => setCompany({ ...company, location: e.target.value })}
              placeholder="Enter company location"
              required
              className="input"
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              value={company.industry}
              onChange={(e) => setCompany({ ...company, industry: e.target.value })}
              placeholder="Enter company industry"
              required
              className="input"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <div className="grid w-full gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              value={company.address}
              onChange={(e) => setCompany({ ...company, address: e.target.value })}
              placeholder="Enter company address"
              required
              className="input"
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              value={company.pincode}
              onChange={(e) => setCompany({ ...company, pincode: e.target.value })}
              placeholder="Enter company pincode"
              required
              className="input"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            value={company.description}
            onChange={(e) => setCompany({ ...company, description: e.target.value })}
            placeholder="Enter company description"
            required
            className="form_textarea"
          />
        </div>
        <div className="my-4 flex justify-center gap-4">
          <Link href="/companies" className="flex items-center rounded bg-red-400 p-1 px-4 text-sm text-primary-foreground shadow hover:bg-red-600">
            Cancel
          </Link>
          <Button type="submit" disabled={submitting} className="rounded bg-primary px-5 py-1.5 text-sm text-white">
            {submitting ? `${type}ing...` : type}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CompanyForm;
