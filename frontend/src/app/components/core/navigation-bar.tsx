import { NavLink, useLocation } from 'react-router-dom';
import { NavBarItem } from './header';

export interface NavigationBarProps {
  links: NavBarItem[];
}

export function NavigationBar({ links }: NavigationBarProps) {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center flex-grow gap-4 align-middle">
      {links.map((link: NavBarItem) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={`font-medium flex items-center text-white text-sm transition-colors duration-300 ${
            location.pathname === link.to
              ? 'bg-blue-950 p-1 px-3 rounded-md'
              : 'hover:underline'
          }`}
        >
          {/* Render the icon only if it exists */}
          {link.icon && <span className="mr-2">{link.icon}</span>}
          <span className="align-middle font-medium flex text-white text-sm">
            {link.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
