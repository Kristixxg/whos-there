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
    <Router>
      <Routes>
        <Route  path='/' element={<Login/>} />
        <Route  path='/signup' element={<Signup/>} />
        <Route  path='/homepage' element={<Home/>} />
        <Route  path='/profile' element={<Profile/>} />
      </Routes>
    </Router>
    </ClientOnly>
  //  </ApolloClient>
  );
}

export default App;

