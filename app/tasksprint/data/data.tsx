import {
  CheckCircledIcon,
  StopwatchIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";

export const categories = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "Active",
    label: "Active",
    icon: CheckCircledIcon,
  },
  {
    value: "Completed",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "Pending",
    label: "Pending",
    icon: StopwatchIcon,
  },
  {
    value: "On Hold",
    label: "On Hold",
    icon: StopwatchIcon,
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    icon: StopwatchIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
