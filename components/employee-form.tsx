"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload } from "lucide-react";
import { useUploadThing } from "@/hooks/useUploadThing";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmployeeForm = ({ type, employee, setEmployee, submitting, handleSubmit }) => {
  const [imageUrl, setImageUrl] = useState(employee.image || null);
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const onDrop = async (acceptedFiles) => {
    try {
      const uploadedFiles = await startUpload(acceptedFiles);
      if (uploadedFiles && uploadedFiles[0]) {
        const url = uploadedFiles[0].url;
        setImageUrl(url);
        setEmployee({ ...employee, image: url });
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card className="w-full border-none shadow-none mb-20">
    <CardHeader>
      <CardTitle className="text-3xl font-bold">
        <span className="text-blue-600">{type} Employee</span>
      </CardTitle>
      <p className="text-muted-foreground">
        {type} an employee record in the management system.
      </p>
    </CardHeader>
    <CardContent>
    <div className="mb-5">
     
      <div className="my-10">
        <Form>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="employee_id" value="" />

            <div className="flex flex-col md:flex-row gap-4">
              {/* Image Upload Section */}
              <div className="w-full md:w-1/3 space-y-4">
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer h-64 flex items-center justify-center"
                >
                  <input {...getInputProps()} />
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Profile"
                      width={200}
                      height={200}
                      className="mx-auto rounded-full"
                    />
                  ) : isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p>Drag 'n' drop files here, or click to select files</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Employee Details Form */}
              <div className="w-full md:w-2/3 space-y-4">
                {/* Name and Email Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      First Name
                    </Label>
                    <Input
                      value={employee.firstName}
                      onChange={(e) =>
                        setEmployee({ ...employee, firstName: e.target.value })
                      }
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      value={employee.lastName}
                      onChange={(e) =>
                        setEmployee({ ...employee, lastName: e.target.value })
                      }
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    value={employee.email}
                    onChange={(e) =>
                      setEmployee({ ...employee, email: e.target.value })
                    }
                    placeholder="john.doe@example.com"
                    type="email"
                    required
                  />
                </div>
                </div>

               

                {/* Phone, Department, and Job Title */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Phone
                    </Label>
                    <Input
                      value={employee.phone}
                      onChange={(e) =>
                        setEmployee({ ...employee, phone: e.target.value })
                      }
                      placeholder="+1234567890"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Department
                    </Label>
                    <Input
                      value={employee.department}
                      onChange={(e) =>
                        setEmployee({
                          ...employee,
                          department: e.target.value,
                        })
                      }
                      placeholder="Engineering"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Job Title
                    </Label>
                    <Input
                      value={employee.jobTitle}
                      onChange={(e) =>
                        setEmployee({ ...employee, jobTitle: e.target.value })
                      }
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                {/* Status and Address Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Salary
                    </Label>
                    <Input
                      value={employee.salary}
                      onChange={(e) =>
                        setEmployee({ ...employee, salary: e.target.value })
                      }
                      placeholder="10000"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Status
                    </Label>
                    <Select
                      value={employee.status}
                      onValueChange={(value) =>
                        setEmployee({ ...employee, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Address
                    </Label>
                    <Input
                      value={employee.address}
                      onChange={(e) =>
                        setEmployee({ ...employee, address: e.target.value })
                      }
                      placeholder="1234 Main St"
                    />
                  </div>
                </div>

                {/* City, State, and Role Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      City
                    </Label>
                    <Input
                      value={employee.city}
                      onChange={(e) =>
                        setEmployee({ ...employee, city: e.target.value })
                      }
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      State
                    </Label>
                    <Input
                      value={employee.state}
                      onChange={(e) =>
                        setEmployee({ ...employee, state: e.target.value })
                      }
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Role
                    </Label>
                    <Select
                      value={employee.role}
                      onValueChange={(value) =>
                        setEmployee({ ...employee, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Designer">Designer</SelectItem>
                        <SelectItem value="Team Lead">Team Lead</SelectItem>
                        <SelectItem value="HR Specialist">HR Specialist</SelectItem>
                        <SelectItem value="Sales Representative">Sales Representative</SelectItem>
                        <SelectItem value="Marketing Specialist">Marketing Specialist</SelectItem>
                        <SelectItem value="Customer Support">Customer Support</SelectItem>
                        <SelectItem value="Intern">Intern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                 
                }}
                className="w-full md:w-auto min-w-32 text-white hover:text-white bg-red-400 hover:bg-red-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || isUploading}
                className="w-full md:w-auto min-w-32"
              >
                {submitting || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                    type
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
    </CardContent>
    </Card>
  );
};

export default EmployeeForm;
