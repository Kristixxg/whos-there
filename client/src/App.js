import React from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
// import {ApolloClient} from '@apollo/client';
import { BrowserRouter as Router, Routes, 
  Route} from 'react-router-dom';
import { ClientOnly } from "react-client-only";

function App() {
  return (
    // <ApolloClient>
    <ClientOnly>
        <nav>
          <h1>WHOS THERE <span>🎾</span></h1>
          <ul>
            <li><a href='/homepage'>HOME</a></li>
            <li><a href='/profile'>PROFILE</a></li>
            <li><a href='/'>LOGIN</a></li>
          </ul>
        </nav>

    <Router>
      <Routes>
        <Route  path='/' element={<Login/>} />
        <Route  path='/signup' element={<Signup/>} />
        <Route  path='/homepage' element={<Home/>} />
        <Route  path='/profile' element={<Profile/>} />
      </Routes>
    </Router>

      <footer>
        <div>
          <button><a>GitHub</a></button>
        </div>
        <div>
        <small>&copy; All rights reserved by Whos There Team</small>
        </div>
      </footer>
      
    </ClientOnly>
  //  </ApolloClient>
  );
}

export default App;

