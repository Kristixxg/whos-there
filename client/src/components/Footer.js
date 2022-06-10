import React from "react";
import './footer.css';
import {BsGithub} from 'react-icons/bs'
import './footer.css';

function Footer() {
    return (
        <footer>
        <div>
          <a target="#" href="https://github.com/Kristixxg/whos-there"><BsGithub /></a>
        </div>
        <div>
        <small>&copy; All rights reserved by Whos There Team</small>
        </div>
      </footer>
    )
}

export default Footer;