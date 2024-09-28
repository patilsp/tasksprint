"use client";

import React, { useEffect, useState } from "react";

const CompanyDetails = ({ params }) => {
  const { id } = params;
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCompanyDetails = async () => {
        try {
          const response = await fetch(`/api/company/${id}`);
          const data = await response.json();
          setCompany(data);
        } catch (error) {
          console.error("Error fetching company details:", error);
        }
      };

      fetchCompanyDetails();
    }
  }, [id]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mx-auto my-8">
      <div className="bg-white p-6 shadow-md dark:bg-gray-800">
        <h1 className="font-bold text-lg">{company.name}</h1>
        <p><strong>Email:</strong> {company.email}</p>
        <p><strong>Phone:</strong> {company.phone}</p>
        <p><strong>Location:</strong> {company.location}</p>
        <p><strong>Industry:</strong> {company.industry}</p>
        <p><strong>Description:</strong> {company.description}</p>
        <p><strong>Status:</strong> {company.status}</p>
      </div>
    </section>
  );
};

export default CompanyDetails;
