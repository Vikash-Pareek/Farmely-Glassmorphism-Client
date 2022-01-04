import React from 'react';
import Menu from './Menu';
import Search from './Search';
import '../styles.css';

const Layout = ({
  title = '',
  path,
  className,
  children
}) => (
  <div>
    <Menu />
    <div
      className={path === '/' ? 'jumbotron jumbotron-home'
        : path === '/rent' ? 'jumbotron jumbotron-rent'
          : path === '/cart' ? 'jumbotron jumbotron-cart'
            : path === '/signin' ? 'jumbotron jumbotron-signin'
              : path === '/signup' ? 'jumbotron jumbotron-signup'
                : 'jumbotron'}
    >
      <div className='jumbotron-title-container'>
        <p>{title}</p>
      </div>
      {path === '/' ? <Search /> : path === '/rent' ? <Search /> : null}
    </div>
    <div className={className}>
      {children}
    </div>
  </div>
);

export default Layout;
