import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';
import Logo from "../assets/logo-tractor.png";
import "./Menu.css";

// mui imports
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#069E2D', textDecoration: 'none' };
  } else {
    return { color: '#C0690A', textDecoration: 'none' };
  }
};


const MaterialAppBar = ({ history }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileMenuClose = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderMobileMenu = (
    <nav className={mobileMenuOpen ? 'mobile-nav-bar active' : 'mobile-nav-bar'}>
      <button className='mobile-menu-close-btn' onClick={mobileMenuClose}>
        <CloseIcon fontSize='large' />
      </button>

      <div className='mobile-menu-items-container'>
        <Link style={isActive(history, '/')} to='/'>
          <div className='menu-items'>
            <HomeIcon />
            <p>Home</p>
          </div>
        </Link>

        <Link style={isActive(history, '/rent')} to='/rent'>
          <div className='menu-items'>
            <StorefrontIcon />
            <p>Rent</p>
          </div>
        </Link>

        <Link style={isActive(history, '/cart')} to='/cart'>
          <div className='menu-items'>
            <Badge badgeContent={itemTotal()} color="success" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
              <ShoppingBagIcon />
            </Badge>
            <p>Cart</p>
          </div>
        </Link>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Link
            style={isActive(history, '/user/dashboard')}
            to='/user/dashboard'
          >
            <div className='menu-items'>
              <DashboardIcon />
              <p>Dashboard</p>
            </div>
          </Link>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Link
            style={isActive(history, '/admin/dashboard')}
            to='/admin/dashboard'
          >
            <div className='menu-items'>
              <DashboardIcon />
              <p>Dashboard</p>
            </div>
          </Link>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <Link style={isActive(history, '/signin')} to='/signin'>
              <div className='menu-items'>
                <AccountCircleIcon />
                <p>Signin</p>
              </div>
            </Link>

            <Link style={isActive(history, '/signup')} to='/signup'>
              <div className='menu-items'>
                <PersonAddIcon />
                <p>Signup</p>
              </div>
            </Link>
          </Fragment>
        )}

        {isAuthenticated() && (
          <span
            onClick={() =>
              signout(() => {
                history.push('/');
              })
            }
          >
            <div className='menu-items' style={{ color: '#C0690A', cursor: 'pointer' }}>
              <ExitToAppIcon />
              <p>Signout</p>
            </div>
          </span>
        )}
      </div>
    </nav>
  );

  return (
    <div>
      {renderMobileMenu}
      <nav id='nav-bar'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <div className='title-container'>
            <img src={Logo} className='logo-img' alt="farmerly-logo" />
            <p>
              FARMERLY
            </p>
          </div>
        </Link>

        <div className='menu-items-container'>
          <Link style={isActive(history, '/')} to='/'>
            <div className='menu-items'>
              <HomeIcon />
              <p>Home</p>
            </div>
          </Link>

          <Link style={isActive(history, '/rent')} to='/rent'>
            <div className='menu-items'>
              <StorefrontIcon />
              <p>Rent</p>
            </div>
          </Link>

          <Link style={isActive(history, '/cart')} to='/cart'>
            <div className='menu-items'>
              <Badge badgeContent={itemTotal()} color="success" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <ShoppingBagIcon />
              </Badge>
              <p>Cart</p>
            </div>
          </Link>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Link
              style={isActive(history, '/user/dashboard')}
              to='/user/dashboard'
            >
              <div className='menu-items'>
                <DashboardIcon />
                <p>Dashboard</p>
              </div>
            </Link>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Link
              style={isActive(history, '/admin/dashboard')}
              to='/admin/dashboard'
            >
              <div className='menu-items'>
                <DashboardIcon />
                <p>Dashboard</p>
              </div>
            </Link>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <Link style={isActive(history, '/signin')} to='/signin'>
                <div className='menu-items'>
                  <AccountCircleIcon />
                  <p>Signin</p>
                </div>
              </Link>

              <Link style={isActive(history, '/signup')} to='/signup'>
                <div className='menu-items'>
                  <PersonAddIcon />
                  <p>Signup</p>
                </div>
              </Link>
            </Fragment>
          )}

          {isAuthenticated() && (
            <span
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              <div className='menu-items' style={{ color: '#C0690A', cursor: 'pointer' }}>
                <ExitToAppIcon />
                <p>Signout</p>
              </div>
            </span>
          )}
        </div>
        <div className='mobile-menu-icon'>
          <button onClick={mobileMenuClose}>
            <MenuIcon fontSize='large' />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(MaterialAppBar);
