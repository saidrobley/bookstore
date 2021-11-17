import Home from './pages/Home';
import Login from './components/account/login/Login';
import Logout from './components/account/logout/Logout';
import Register from './components/account/register/Register';
import { useSelector } from 'react-redux';
import Product from './pages/Product';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import React from 'react';
import Cart from './pages/Cart';
import Success from './pages/Success';

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/account/login">
          <Login />
        </Route>

        <Route path="/account/register" exact>
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/account/logout">
          <Logout />
        </Route>
        <Route path="/products/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
