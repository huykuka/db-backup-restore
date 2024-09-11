import {Sheet, SheetContent, SheetTrigger} from "@frontend/shared/components/ui/sheet";
import React from "react";
import {NavigationBarProps} from "./navigation-bar";
import {Button} from "@frontend/shared/components/ui/button";
import {NavLink, useLocation} from "react-router-dom";
import {NavBarItem} from "./header";


export default function BurgerMenu({links}: NavigationBarProps) {
    const location = useLocation();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                    <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
                <div className="grid gap-4 p-4">
                    {links.map((link: NavBarItem) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={`text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50${
                                location.pathname === link.to ? 'bg-blue-950 p-1 px-3 rounded-md' : 'hover:underline'
                            }`}
                        >
                        <span className="align-middle font-medium flex text-white text-sm">
                            {link.label}
                        </span>
                        </NavLink>
                    ))}

                </div>
            </SheetContent>
        </Sheet>
    )
}

function MenuIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
    )
}