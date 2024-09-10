import React from 'react';
import {ModeToggle} from "./mode-toggle";
import {NavigationBar} from "./navigation-bar";


const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-2 px-6 mb-2" style={{backgroundColor: '#033681'}}>
            <div className="flex flex-grow items-center space-x-4">
                <span
                    className="text-white text-xl font-semibold text-center flex items-center border-r border-white pr-4">
                    Database Management
                </span>
                <NavigationBar/>
            </div>
            <ModeToggle></ModeToggle>
        </header>
    );
};

export default Header;