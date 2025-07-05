import React from 'react';
import './MainLayout.css';

function MainLayout({ children }: { children: React.ReactNode }) {
  return <section className="main-layout">{children}</section>;
}

export { MainLayout };
