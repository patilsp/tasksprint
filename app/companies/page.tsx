"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"; // Ensure you're using your card components

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/company"); // Your API route to get all companies
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <section className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6">Companies</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <Card key={company._id} className="bg-white p-6 shadow-md dark:bg-gray-800">
            <CardHeader className="font-bold text-lg">{company.name}</CardHeader>
            <CardContent>
              <p>{company.industry}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/companies/${company._id}`}>
                <button className="text-indigo-500 underline hover:text-indigo-700">Read More</button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CompaniesPage;
