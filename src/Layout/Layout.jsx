import Header from 'components/Header/Header';
import React from 'react';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className={css.main}>{children}</main>
    </div>
  );
};

export default Layout;
