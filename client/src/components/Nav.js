import React from "react";
import './nav.css';



function Nav() {
    return (
        <nav>
            <h1 className='titleh1'>WHOS THERE <img className="titleImage" src="./images/003-tennis-ball-1.png"></img></h1>
            <ul>
                <li className="button-68" ><a href='/homepage'>HOME</a></li>
                <li className="button-68" ><a href='/profile'>PROFILE</a></li>
                <li className="button-68" ><a href='/'>LOGIN</a></li>
            </ul>
        </nav>
    )
}
export default Nav;


