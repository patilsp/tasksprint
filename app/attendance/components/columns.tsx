"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Leave } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Leave>[] = [
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
    accessorKey: "employeeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("employeeName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "leaveType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leave Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("leaveType")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("startDate")).toLocaleDateString()}</div>
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
      <div>{new Date(row.getValue("endDate")).toLocaleDateString()}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "days",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Days" />
    ),
    cell: ({ row }) => <div>{row.getValue("days")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "reason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason" />
    ),
    cell: ({ row }) => <div>{row.getValue("reason")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`rounded-full text-white p-1 flex justify-center items-center ${
          row.getValue("status") === "Approved"
            ? "bg-green-400"
            : row.getValue("status") === "Rejected"
            ? "bg-red-400"
            : "bg-yellow-400"
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
