import React from 'react';
import {ModeToggle} from "./mode-toggle";
import {NavigationBar} from "./navigation-bar";

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-2 px-6 mb-2" style={{backgroundColor: '#033681'}}>
            <div className="flex items-center">
                <h1 className="text-white text-xl font-semibold mr-4">Database Management</h1>
                <NavigationBar/>
            </div>
            <ModeToggle></ModeToggle>
        </header>
    );
};

export default Header;