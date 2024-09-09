import React, { ReactNode } from 'react';
import Header from "./core/header";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col">
          <Header/>
            <main className="p-5">
                {children}
            </main>
        </div>
    );
};

export default Layout;