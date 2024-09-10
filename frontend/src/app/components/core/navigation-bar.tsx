import * as React from "react"
import {NavigationMenuLink} from "@frontend/shared/components/ui/navigation-menu";
import {cn} from "@frontend/shared/lib/utils";
import {NavLink} from "react-router-dom";


const components: { title: string; href: string; description: string }[] = [
    {
        title: "Home",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
]

export function NavigationBar() {
    return (
        <nav className="hidden md:flex gap-4">
            <NavLink
                to="#"
                className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
                Home
            </NavLink>
            <NavLink
                to="#"
                className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
                About
            </NavLink>
            <NavLink
                to="#"
                className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
                Services
            </NavLink>
            <NavLink
                to="#"
                className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
                Contact
            </NavLink>
        </nav>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
