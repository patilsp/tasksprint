import './globals.css';
import { Metadata } from "next";
import { Roboto } from 'next/font/google';
import { cn } from "@/lib/utils";
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/components/layout/providers';
import { auth } from '@/auth';

// Load the Roboto font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
  variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: {
		default: "Task Sprint",
		template: `%s - Task Sprint`,
	},
	description: "Task Sprint is a simple employee management system application",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
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
          roboto.variable
        )}
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />
          <div className="relative flex min-h-screen flex-col bg-background">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
