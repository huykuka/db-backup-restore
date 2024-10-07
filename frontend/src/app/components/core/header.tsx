import React from 'react';
import BurgerMenu from "./burger-menu";
import {ModeToggle} from "./mode-toggle";
import {NavLink} from "react-router-dom";
import {Separator} from "@frontend/shared/components/ui/separator";
import {NavigationBar} from "./navigation-bar";

export interface NavBarItem {
    to: string;
    label: string;
}

const links: NavBarItem[] = [
    {to: "/", label: "Dashboard"},
    {to: "/manual", label: "Manual"},
    {to: "/log", label: "Logs"},
];

const Header: React.FC = () => {
    return (
        <header className="flex  items-center p-2 px-6 mb-2 justify-between"
                style={{backgroundColor: '#033681'}}>
            <div className="flex flex-row items-center gap-5">

                <div className="flex items-center gap-4 md:hidden">
                    <BurgerMenu links={links}/>
                </div>

                <NavLink to="/" className="flex items-center gap-2">
                    <span
                        className="text-white text-xl font-semibold text-center flex items-center">
                                Database Management
                            </span>
                </NavLink>

                <Separator className="hidden md:block h-[17px] bg-white" orientation="vertical"></Separator>

                <div className="hidden md:block">
                    <NavigationBar links={links}/>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <ModeToggle/>
            </div>

        </header>
    );
};

export default Header;