import React, { ReactNode } from 'react';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
