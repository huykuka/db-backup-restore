import React from 'react';
import { Link } from 'react-router-dom';
import {ModeToggle} from "./mode-toggle";

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 !dark:bg-gray-7 text-white">
            <div className="flex items-center">
                <h1 className="text-accent-foreground text-xl font-bold mr-4">Database Management</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
            <ModeToggle></ModeToggle>
        </header>
    );
};

export default Header;