import React from 'react';
import { Outlet } from 'react-router-dom';
import NotificationContainer from '../ui/NotificationContainer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <NotificationContainer />
    </div>
  );
};

export default Layout;