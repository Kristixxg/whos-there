import React from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import {ApolloClient} from '@apollo/client';
import {RoBrowserRouter as Router, Switch, 
  Route, Redirect,uter} from 'react-router-dom';


function App() {
  return (
    <ApolloClient>
    <Router>
      <div>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/homepage' component={Home} />
        <Route exact path='/profile' component={Profile} />
      </Switch>
      </div>
    </Router>
    </ApolloClient>
  );
}

export default App;

