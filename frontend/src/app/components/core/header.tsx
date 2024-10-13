import { Separator } from '@frontend/shared/components/ui/separator';
import {
  Database,
  HardDriveUploadIcon,
  LayoutDashboardIcon,
  ScrollTextIcon,
} from 'lucide-react';
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import BurgerMenu from './burger-menu';
import LeadingBar from './leading-bar';
import { ModeToggle } from './mode-toggle';
import { NavigationBar } from './navigation-bar';

export interface NavBarItem {
  to: string;
  label: string;
  icon?: ReactNode; // optional property for icons
}

const links: NavBarItem[] = [
  {
    to: '/',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon className="w-4 h-4" />,
  },
  {
    to: '/manual',
    label: 'Manual',
    icon: <HardDriveUploadIcon className="w-4 h-4" />,
  },
  { to: '/log', label: 'Logs', icon: <ScrollTextIcon className="w-4 h-4" /> },
];

const Header: React.FC = () => {
  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex  items-center p-2 px-6 mb-2 justify-between"
        style={{ backgroundColor: '#033681' }}
      >
        <div className="flex flex-row items-center gap-5">
          <div className="flex items-center gap-4 md:hidden">
            <BurgerMenu links={links} />
          </div>

          <NavLink to="/" className="flex items-center gap-2">
            <Database className="mr-2 text-white" />
            <span className="text-white text-xl font-semibold text-center flex items-center">
              Database Management
            </span>
          </NavLink>

          <Separator
            className="hidden md:block h-[17px] bg-white"
            orientation="vertical"
          ></Separator>

          <div className="hidden md:block">
            <NavigationBar links={links} />
          </div>
        </div>

        <div className="flex flex-row items-center justify-start">
          <ModeToggle />
        </div>
      </header>
      <LeadingBar />
    </>
  );
};

export default Header;
