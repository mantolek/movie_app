import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignJustify, FiXCircle } from 'react-icons/fi';
import MenuDesktop from './Components/MenuDesktop';
import MenuMobile from './Components/MenuMobile';

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const openNav = () => setVisible(!visible);

  return (
    <nav className='navbar'>
      <div className='navbar_wrapper'>
        <div className='navbar__logo'>
          <Link to='/'>
            Logo
          </Link>
        </div>

        <div className='navbar__wrapper-desktop'>
          <MenuDesktop  />
        </div>

        <FiAlignJustify onClick={() => openNav()} className='burger' />

        <div className={`navbar__wrapper-mobile ${visible ? 'active' : ''}`}>
          <FiXCircle onClick={() => openNav()} className='closeMenu' />
          <MenuMobile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
