import './App.css';
import Nav from './components/Nav/Nav';
import Login from './components/account/login/Login.js';
import Products from './components/products/Products';
import Register from './components/account/register/Register';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function App() {
  let history = useHistory();
  const [user, setUser] = useState({ email: '', firstname: '', lastname: '' });
  if (user.email) {
    <Redirect push to="/" />;
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log('logged in user in app', loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);

      <Redirect to="/" />;
      if (user) {
        <Redirect to="/" />;
      }
    }
  }, []);

  const logoutUser = () => {
    console.log('inside logoutUser App');
    localStorage.clear();

    user.email = '';
    setUser({});

    console.log('user inside handlelogout', user);
  };
  const registerUser = async (userData) => {
    console.log('inside registerUser in the App', userData);
    const response = await axios.post('/auth/register', userData);
    console.log('response inside registerUser', response.data.user);
    const user = {
      username: response.data.user.email,
      password: response.data.user.password,
    };

    loginUser(user);
  };
  const loginUser = async (userData) => {
    console.log('inside loginUser in the App', userData);
    const response = await axios.post('/auth/login', userData);
    console.log('response inside login', response.data);
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
      <Redirect push to="/" />;
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
          {!user.email ? (
            <Route
              path="/account/register"
              exact
              component={() => <Register registerUser={registerUser} />}
            />
          ) : (
            <Redirect to="/" />
          )}
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
