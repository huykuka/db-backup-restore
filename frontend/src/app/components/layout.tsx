import { Outlet } from 'react-router-dom';
import Header from './core/header';



const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-5 mt-12">
        < Outlet />
      </main>
    </div>
  );
};


export default Layout;
