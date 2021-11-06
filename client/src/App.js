import './App.css';
import Nav from './components/Nav/Nav';
import Login from './components/account/login/Login.js';
import Products from './components/products/Products';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function App() {
  const [user, setUser] = useState({ email: '', firstname: '', lastname: '' });
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log('logged in user in app', loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      if (user) {
        <Redirect to="/" />;
      }
    }
  }, [user.email]);

  const logoutUser = () => {
    console.log('inside logoutUser App');
    localStorage.clear();

    user.email = '';
    setUser({});

    console.log('user inside handlelogout', user);
  };

  const loginUser = async (userData) => {
    //const user = { username, password };
    console.log('inside loginUser in the App', userData);

    console.log('user', user);
    const response = await axios.post('/auth/login', userData);
    // set the state of the user
    if (response) {
      setUser({
        email: response.data.email,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
      });
      console.log('user', user);
      console.log('response data', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log(response.data);
      <Redirect push to="/products" />;
    }
  };
  return (
    <Wrap>
      <Router>
        <Nav logoutUser={logoutUser} user={user} />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route
            path="/account/login"
            exact
            component={() => <Login loginUser={loginUser} />}
          />
        </Switch>
      </Router>
    </Wrap>
  );
}

export default App;

export const Wrap = styled.div`
  background-color: red;
  margin: auto;
  width: 90%;
`;
