import React, { useContext } from 'react';
//import './App.css';

import Home from "./pages/Home"
import Login from "./pages/Login"
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Chatroom from './layers/Chatroom';

/*
 * Frontend flow: 
 *  1. user first enters this app by QR code "/user/{userID}"
 *      else (ex. "/"):  show "Please enter using a valid QRcode"
 * 
 *  2. if game ended: 
 *      show only leadership page.
 * 
 *  3. shows different interface according to players' role
 *      -> member
 *      -> lead
 *      -> host
 *      -> admin
 * 
 *  player will be notified every time there's new message or announcement.
 *  player's scoreboard reloads from db whenever there's a score change.
 *  player's tasks reloads from db whenever his team recieves new task.
 * 
 */


function App() {

  const {user} = useContext(AuthContext)
  return (
    <Router>
      
      <Switch>
        <Route exact path="/">
          {/* {user ? <Home /> : <Login />} */}
          <Chatroom />
          <Home />
        </Route>
        <Route path="/login/:rid">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
