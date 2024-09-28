"use client";

import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { names } from "../data/data";
import { employeesSchema } from "../data/schema";
import { toast } from "react-hot-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (employeeId: string) => void;
  onDelete: (employeeId: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  let employee;
  try {
    employee = employeesSchema.parse(row.original);
  } catch (error) {
    console.error("Error parsing employee data:", error);
    toast.error("Error parsing employee data");
    return null; // Or handle this case accordingly
  }

  const handleEdit = () => {
    if (employee.id) {
      router.push(`/admin/employees/update-employee?id=${employee.id}`);
    } else {
      console.error("Employee ID is undefined");
      toast.error("Employee ID is missing");
    }
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this employee?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/employee/${employee.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete employee");
        }
        toast.success("Employee has been deleted!");
        router.refresh(); // Refresh the data or redirect as needed
        router.push("/admin/employees"); // Redirect to the employees list or another relevant page
        if (onDelete) {
          onDelete(employee.id); // Call the onDelete function if provided
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Error deleting employee");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 bg-slate-100 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onSelect={handleDelete}>Delete</DropdownMenuItem>
        {/* Additional menu items can be uncommented if needed */}
        {/* <DropdownMenuItem>Make as Completed</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Names</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={employee.label}>
              {names.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
