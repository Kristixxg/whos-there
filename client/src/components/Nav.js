import React from "react";
import "./nav.css";
import Auth from "../utils/auth";

import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <h1 className="titleh1">
        WHOS THERE{" "}
        <a href="/"><img className="titleImage" src="./images/003-tennis-ball-1.png"></img></a>
      </h1>
      {Auth.loggedIn() ? (
        <>
          <ul className="nav_ul">
            <li className="button-68">
              <Link to="/home">HOME</Link>
            </li>
            <li className="button-68">
              <Link to="/profile">PROFILE</Link>
            </li>
            <li onClick={Auth.logout} className="button-68">
              <Link to="/homepage">LOGOUT</Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className="nav_ul">
            <li className="button-68">
              <Link to="/home">HOME</Link>
            </li>
            <li className="button-68">
              <Link to="/signup">SIGN UP</Link>
            </li>
            <li className="button-68">
              <Link to="/login">LOGIN</Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}
export default Nav;
