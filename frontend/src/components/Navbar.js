import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShip, FaBars, FaTimes } from 'react-icons/fa';
import '../css/Navbar.css';
import { Button } from './Button';
import AuthContext  from '../context/AuthContext';
import axios from "axios";

const Navbar= ()=>{

 const [click, setClick] =useState(false)
 const [button, setButton] =useState(true)
 const { loggedIn } = useContext(AuthContext);
 const { getLoggedIn } = useContext(AuthContext);

 async function logOut(){
     //request to delete the cookie
     //send the cookie back to the server to detect the new update state
     await axios.get("/auth/logout");
     await getLoggedIn()  
 }

 const handleClick = () => setClick(!click)
 const closeMobileMenu= () =>setClick(false)
 const showButton = () =>{
     if(window.innerWidth <= 960){
         setButton(false)
     }
     else{
         setButton(true)
     }
 }

 window.addEventListener('resize', showButton)

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            BL<FaShip />EXPERIENCE 
          </Link>
          <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link to='/details' className='nav-links' onClick={closeMobileMenu}>
                      Details
                  </Link>
                  
              </li>

              {loggedIn === false && (
              <li className='nav-item'>
                  <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                      SIGN IN
                  </Link>
              </li>
              )}

          {loggedIn === true && (
              <li className='nav-item'>
                  <Link to='/'  className='nav-links-mobile' onClick={closeMobileMenu, logOut}>
                      SIGN OUT
                  </Link>
              </li>
              )}

          </ul>

          {loggedIn===false && (<>
          {button && <Link to='sign-in'><Button buttonStyle='btn--outline'> SIGN IN </Button></Link>}
          </>
          )}
          {loggedIn===true && (<>
          {button && <Link to='/'><Button  onClick={logOut} buttonStyle='btn--outline'> SIGN OUT </Button></Link>}
          </>
          )}

        </div>
       
      </nav>
     
    </>
  );
}

export default Navbar;
