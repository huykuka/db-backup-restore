import { authService } from '../../core/services/auth.service';
import { Separator } from '@frontend/shared/components/ui/separator';
import {
  Database,
  HardDriveUploadIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import React, { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BurgerMenu from './burger-menu';
import LeadingBar from './leading-bar';
import { ModeToggle } from './mode-toggle';
import { NavigationBar } from './navigation-bar';
import UserSection from './user-section';

export interface NavBarItem {
  to: string;
  label: string;
  icon?: ReactNode; // optional property for icons
}

const links: NavBarItem[] = [
  {
    to: '/home',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon className="w-4 h-4" />,
  },
  {
    to: '/manual',
    label: 'Manual',
    icon: <HardDriveUploadIcon className="w-4 h-4" />,
  },
  // { to: '/log', label: 'Logs', icon: <ScrollTextIcon className="w-4 h-4" /> },
];

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => navigate('/login'));
  };

  return (
    <>
      <header
        className="fixed w-screen overflow-hidden top-0 left-0 right-0 z-50 flex  items-center p-2 px-6 mb-2 justify-between"
        style={{ backgroundColor: '#033681' }}
      >
        <div className="flex flex-row items-center gap-5">
          <div className="flex items-center gap-4 md:hidden">
            <BurgerMenu links={links} />
          </div>

          <NavLink to="/" className="flex items-center gap-2">
            <Database className="mr-2 text-white hidden md:block" />
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

        <div className="flex flex-row items-center  gap-3">
          <ModeToggle />
          <UserSection
            onLogOut={handleLogout}
            user={{ email: 'admin@mail.com', name: 'admin' }}
          />
        </div>
      </header>
      <LeadingBar />
    </>
  );
};

export default Header;
