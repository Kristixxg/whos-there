import React from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import {ApolloProvider, ApolloClient,createHttpLink,InMemoryCache} from '@apollo/client';
import { BrowserRouter as Router, Routes, 
  Route} from 'react-router-dom';
  import { setContext } from '@apollo/client/link/context';
// import { ClientOnly } from "react-client-only";

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

function App() {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}> 
    {/* <ClientOnly> */}
        <nav>
          <h1 className='titleh1'>WHOS THERE <span>🎾</span></h1>
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
      
    {/* </ClientOnly> */}
  </ApolloProvider>
  );
}

export default App;

