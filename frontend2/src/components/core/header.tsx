import React from 'react';
import {ModeToggle} from "./mode-toggle";

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 !dark:bg-gray-7 text-white">
            <div className="flex items-center">
                <h1 className="text-accent-foreground text-xl font-bold mr-4">Database Management</h1>
                <nav>
                    <ul className="flex space-x-4">
                    </ul>
                </nav>
            </div>
            <ModeToggle></ModeToggle>
        </header>
    );
};

export default Header;