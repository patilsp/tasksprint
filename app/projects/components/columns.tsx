"use client"

import { useEffect, useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import dayjs from "dayjs";
import { names, emails, phones, statuses } from "../data/data";
import { Customer } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import axios from 'axios';

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]" 
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => (
      <div className="">
        {dayjs(row.getValue("startDate")).format("DD MMM, YYYY")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => (
      <div className="">
        {dayjs(row.getValue("endDate")).format("DD MMM, YYYY")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <Badge className="">{row.getValue("status")}</Badge>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
    cell: ({ row }) => <AssignedToCell assignedToId={row.getValue("assignedTo")} />, // Custom cell for displaying the assigned person's name
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

// Custom component to display the employee name based on the assignedTo ID
const AssignedToCell = ({ assignedToId }) => {
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    const fetchEmployeeName = async () => {
      try {
        const response = await axios.get(`/api/employees/${assignedToId}`);
        const employee = response.data;

        if (employee) {
          setEmployeeName(employee.firstName); // Assuming 'name' field is present in the employee object
        } else {
          setEmployeeName('Unknown'); // Handle if employee is not found
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setEmployeeName('Unknown');
      }
    };

    if (assignedToId) {
      fetchEmployeeName();
    }
  }, [assignedToId]);

  return <div>{employeeName}</div>;
};
