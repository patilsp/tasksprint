'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
type CompProps = {};
export default function ThemeToggle({}: CompProps) {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button variant="ghost" className="size-8 flex justify-center items-center rounded-md border-input bg-transparent border shadow-sm hover:bg-accent hover:text-slate-900 ">                
          <SunIcon className="hover:fill-black rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" size={26} />
          <MoonIcon className="absolute rotate-90 hover:fill-blue-600 scale-0 transition-all dark:rotate-0 dark:scale-100" size={26} />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
