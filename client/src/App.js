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
import ProductForm from './components/products/ProductForm';

function App() {
  let history = useHistory();
  const [user, setUser] = useState({ email: '', firstname: '', lastname: '' });
  const [err, setErr] = useState({ message: '' });

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
    try {
      const response = await axios.post('/auth/login', userData);
      console.log('response inside login', response.data);
      // set the state of the user
      if (response.data.err) {
        localStorage.clear();
        console.log('insidedddd');
        console.log(response.data.err);
        setErr({
          message: response.data.err,
        });
        history.push('/');
      } else {
        setErr({});
        setUser({
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
        });
        console.log('user', user);
        console.log('response data', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        console.log(response);
        <Redirect push to="/" />;
      }
    } catch (err) {
      console.log('inside catch');
      console.log(err);
    }
  };

  return (
    <Wrap>
      <Router>
        <Nav logoutUser={logoutUser} user={user} />
        <Switch>
          <Route path="/" exact component={() => <Products user={user} />} />
          <Route path="/product/add" exact component={ProductForm} />
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
      {err && (
        <h1 style={{ textAlign: 'center', color: 'red' }}>{err.message}</h1>
      )}
    </Wrap>
  );
}

export default App;

export const Wrap = styled.div`
  margin: auto;
  width: 90%;
`;
