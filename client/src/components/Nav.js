import React from "react";
import './nav.css';
import Auth from '../utils/auth';

// import { Link } from 'react-router-dom';



function Nav() {
    return (
        <nav>
             <h1 className='titleh1'>WHOS THERE <img className="titleImage" src="./images/003-tennis-ball-1.png"></img></h1>
        {Auth.loggedIn() ? 
            (
                <>
                    <ul>
                        {/* <li className="button-68"><Link to='/homepage'>HOME</Link></li>
                        <li className="button-68"><Link to='/profile'>PROFILE</Link></li>
                        <li onClick={Auth.logout} className="button-68"><Link to='/homepage'>LOGOUT</Link></li> */}

                        <li className="button-68" ><a href='/homepage'>HOME</a></li>
                        <li className="button-68" ><a href='/profile'>PROFILE</a></li>
                        <li className="button-68" ><a onClick={Auth.logout} href='/homepage'>LOGOUT</a></li>
                    </ul>
                </>
            ) : 
            (
                <>
                    <ul>
                        {/* <li className="button-68"><Link to='/homepage'>HOME</Link></li>
                        <li className="button-68"><Link to='/signup'>SIGN UP-</Link></li>
                        <li className="button-68"><Link to='/'>LOGIN-</Link></li> */}

                        <li className="button-68" ><a href='/homepage'>HOME</a></li>
                        <li className="button-68" ><a href='/signup'>SIGN UP</a></li>
                        <li className="button-68" ><a href='/'>LOGIN</a></li>
                    </ul>
                </>
            )
        }
        </nav>
    )
}
export default Nav;


