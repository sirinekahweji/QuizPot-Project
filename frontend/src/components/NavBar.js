import React from 'react';
import logo from '../assets/logo.png';


const NavBar = () => {
    return ( 
        <nav className='navbar'>
            <img src={logo} alt="QuizBot Logo" className='logo'/>
            <p>EN </p>
        </nav>
     );
}
 
export default NavBar;