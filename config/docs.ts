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
      title: "Search",
      href: "/",
    },

    {
      title: "Calendar",
      href: "/",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Tasks",
      href: "/tasks",
    },
    {
      title: "Reports",
      href: "/reports",
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
          href: "/sign-up",
        },
        // ... other sidebarNav sub-items ...
      ],
    },
    // ... other sidebarNav items ...
  ],
};
