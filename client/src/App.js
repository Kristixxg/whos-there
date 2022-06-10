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


import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    // <ApolloClient>
    <ClientOnly>
      <Nav />
      <Router>
        <Routes>
          <Route  path='/' element={<Login/>} />
          <Route  path='/signup' element={<Signup/>} />
          <Route  path='/homepage' element={<Home/>} />
          <Route  path='/profile' element={<Profile/>} />
        </Routes>
      </Router>
      <Footer />      
    </ClientOnly>
  //  </ApolloClient>
  );
}

export default App;

