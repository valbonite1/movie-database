import React, { useState } from 'react';
import './Navbar.css';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import Search from './Search';
import {NavLink} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import AccountSetting from './AccountSetting';



const Navbar = () => {

    const [click, setClick] = useState(false);    //state for hamburger menu
    const handleClick = () => setClick(!click);    //handles click for burger change
    const closeMobMenu = () => setClick(false);   // handles menu bar appear

    const [navbar, setNavbar] = useState(false); //navbar color change on scroll
    const { isAuthenticated } = useAuth0();

    const activeNavbar = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', activeNavbar);
    
    let iconStyle = {
        color: '#fff',
        fontSize: '1rem'
    }

    return(
        <> 
        {isAuthenticated && (
        <nav className={navbar ? 'navbar scrolled' : 'navbar'}>
            <div className='left-side'>
                <div className={click ? 'focus-navbar focus' : 'focus-navbar'} onClick={closeMobMenu}></div>
                <div className='logo-container'>
                    <a href="#" className='navbar-logo'><h3>MFLIX</h3></a>
                </div>
                <div className='menu' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>  
                <div className={click ? 'navbar-nav active' : 'navbar-nav'}>
                    <ul>
                        <li className="nav-item" onClick={closeMobMenu}>
                            <a href="#">Home</a>
                        </li>
                        <li className="nav-item" onClick={closeMobMenu}>
                            <a href="#about">Movies</a>
                        </li>
                        <li className="nav-item" onClick={closeMobMenu}>
                            <a href="#work">TV Series</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='account-section'>
                <Search />
                <AccountSetting />
            </div>
        </nav>
        )}  
        </>
    );
}

export default Navbar;

