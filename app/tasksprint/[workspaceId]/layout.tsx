import React from 'react';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Add your workspace layout components here, e.g., sidebar, header */}
      {children}
    </div>
  );
} 