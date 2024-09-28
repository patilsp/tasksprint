"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component for status display
import { Task } from "../data/schema"; // Assuming you have a Task type defined
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// Task columns configuration
export const columns: ColumnDef<Task>[] = [
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
      <DataTableColumnHeader column={column} title="Task ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id");
      return <div className="w-[60px]">{id}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      return (
        <Badge variant={priority === "high" ? "danger bg-red-500 text-white" : priority === "medium" ? "warning bg-yellow-500 text-white" : "success bg-green-500 text-white"}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = row.getValue("status");
  //     return (
  //       <Badge variant={status === "Completed" ? "success bg-green-500 text-white" : "warning bg-yellow-500 text-white"}>
  //         {status}
  //       </Badge>
  //     );
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const dueDate = new Date(row.getValue("dueDate")).toLocaleDateString();
      return <div className="">{dueDate}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
