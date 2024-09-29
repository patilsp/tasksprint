import Header from '@/components/layout/header';
import TopBar from '@/components/layout/top-bar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Sprint',
  description: 'Task Sprint is a simple employee management system application'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      <div className="flex">
        <TopBar />
        <main className="flex-1 pt-16">{children}</main>
      </div>
    </>
  );
}
