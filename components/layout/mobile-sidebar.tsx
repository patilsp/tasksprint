'use client';
import { DashboardNav } from '@/components/dashboard-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/constants/data';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar Trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <MenuIcon size={28} />
          </motion.button>
        </SheetTrigger>

        {/* Animated Sidebar Content */}
        <SheetContent side="left" className="!px-0 bg-gradient-to-br from-blue-600 to-blue-400">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-4 py-4"
          >
            <div className="px-4 py-2 text-white">
              <h2 className="mb-4 text-2xl font-semibold">Menu</h2>

              {/* Navigation Links */}
              <div className="space-y-1">
                <DashboardNav
                  items={navItems}
                  isMobileNav={true}
                  setOpen={setOpen}
                />
              </div>
            </div>

            {/* Close Button */}
            {/* <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute top-2 right-4 text-white"
              onClick={() => setOpen(false)}
            >
              <MenuIcon size={28} className="text-white hover:text-gray-200" />
            </motion.button> */}
          </motion.div>
        </SheetContent>
      </Sheet>
    </>
  );
}
