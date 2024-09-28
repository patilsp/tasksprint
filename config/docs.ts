// config/docs.ts
import { NavItem } from "types/nav";

interface DocsConfig {
  mainNav: NavItem[];
  sidebarNav: NavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      title: "Tasks",
      href: "/tasks",
    },
    {
      title: "Clients",
      href: "/customers",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Invoices",
      href: "/invoices",
    },
    {
      title: "Reports",
      href: "/reports",
    },
    {
      title: "Contact Us",
      href: "/contact-us",
    },
    {
      title: "About Us",
      href: "/about-us",
    },
     {
      title: "Settings",
      href: "/forms",
    },
   
    
  ],
  sidebarNav: [
    {
      title: "General",
      items: [
        {
          title: "Help",
          href: "/helps",
        },
        {
          title: "Settings",
          href: "/forms",
        },
        {
          title: "Sign Up",
          href: "/register",
        },
        // ... other sidebarNav sub-items ...
      ],
    },
    // ... other sidebarNav items ...
  ],
};
