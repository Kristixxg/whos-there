import React from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import Footer from './components/Footer';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});




function App() {
  return (
    <ApolloProvider client={client}>
      
      <Router>
        <Nav />
        <Routes>

          <Route path='/signup' element={<Signup />} />
          <Route path='/homepage' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;

