import * as React from "react"
import {NavLink, useLocation} from "react-router-dom";


const links = [
    {to: "/", label: "Dashboard"},
    {to: "/manual", label: "Manual"},
    {to: "/log", label: "Logs"},
];

export function NavigationBar() {
    const location = useLocation();

    return (
        <nav className="hidden md:flex items-center flex-grow gap-4 align-middle">
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={`font-medium flex text-white text-sm transition-colors duration-300 ${
                        location.pathname === link.to ? 'bg-blue-950 p-1 px-3 rounded-md' : 'hover:underline'
                    }`}
                >
                    <span
                        className=" align-middle font-medium flex text-white text-sm ">{link.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}

