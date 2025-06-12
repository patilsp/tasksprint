import './globals.css';
import { Metadata } from "next";
import { Inter } from 'next/font/google'
import { cn } from "@/lib/utils";
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/components/layout/providers';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: "Task Sprint",
		template: `%s - Task Sprint`,
	},
	description: "Task Sprint is a simple employee management system application",

  icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: "/favicon.png",
	},
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.variable
        )}
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>           
          <div className="relative flex min-h-screen flex-col bg-background">
            {children}
          </div>
        </Providers>
        <Toaster className="bottom"/>
      </body>
    </html>
  );
}
