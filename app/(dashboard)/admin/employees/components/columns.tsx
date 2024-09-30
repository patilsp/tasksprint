"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge" // Assuming you have a Badge component for status display
import { Employee } from "../data/schema" // Assuming you have an Employee type defined
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

// Employee columns configuration
export const columns: ColumnDef<Employee>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id");
      const formattedId = Number.isInteger(id) ? `EMP-${id}` : `EMP-${parseInt(id, 12)}`;
      return <div className="w-[60px]">{formattedId}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      const imageUrl = row.original.image || "/avatars/02.png";
  
      return (
        <div className="flex items-center space-x-2">
          <img
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            className="w-8 h-8 rounded-full"
          />
          <span>{`${firstName} ${lastName}`}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("role")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="jobTitle" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("jobTitle")}</div>,
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColorClass = status === "Active"
        ? "bg-green-400"
        : status === "Inactive"
        ? "bg-yellow-400"
        : status === "Blocked"
        ? "bg-red-400"
        : "bg-primary";
  
      return (
        <Badge className={`px-1 w-20 text-center ${statusColorClass}`}>
          {status}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },  
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />   
  },
  
]
