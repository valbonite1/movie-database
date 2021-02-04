import React, { useState } from 'react';
import './Navbar.css';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import Search from './Search';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import AccountSetting from './AccountSetting';
import axios from 'axios';



const Navbar = () => {

    const [click, setClick] = React.useState(false);    //state for hamburger menu
    const handleClick = () => setClick(!click);    //handles click for burger change
    const closeMobMenu = () => setClick(false);   // handles menu bar appear

    const [navbar, setNavbar] = React.useState(false); //navbar color change on scroll
    const { isAuthenticated } = useAuth0();

    const [searchValue, setSearchValue] = React.useState('');
    const [movies, setMovies] = React.useState([]);
    const [page, setPage] = React.useState(1);

    //function to change navbar color during scroll

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

    //function to call search

    const getMovieRequest = async (searchValue, page) => {
        await axios
        .get(`${process.env.REACT_APP_BASE_URL}/movies/page/{page}/search?query=${searchValue}`)
        .then(response => {
            const { data: results } = response.data;
            setMovies(results);
            console.log(results);
        })
        .catch((err) => console.log(err));
    }

    React.useEffect(() => {
        getMovieRequest(searchValue, page);
    }, [searchValue])

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
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="nav-item" onClick={closeMobMenu}>
                            <Link to={`/movies/page/${page}`}>Movies</Link>
                        </li>
                        <li className="nav-item" onClick={closeMobMenu}>
                            <Link to="/tvseries">TV Series</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='account-section'>
                <Search setSearchValue={setSearchValue} />
                <AccountSetting />
            </div>
        </nav>
        )}  
        </>
    );
}

export default Navbar;

