import React, {ReactNode} from 'react';
import Header from "./core/header";
import {Separator} from "@frontend/shared/components/ui/separator";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col">
            <Header/>
            <Separator/>
            <main className="p-5">
                {children}
            </main>
        </div>
    );
};

export default Layout;