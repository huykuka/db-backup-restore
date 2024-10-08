import React, { ReactNode } from 'react';
import Header from './core/header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="p-5 mt-12">{children}</main>
    </div>
  );
};

export default Layout;
