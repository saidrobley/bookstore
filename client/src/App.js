import Home from './pages/Home';
import Login from './components/account/login/Login';
import Register from './components/account/register/Register';
import { useSelector } from 'react-redux';
import Product from './pages/Product';
import Admin from './pages/Admin';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import React from 'react';
import Cart from './pages/Cart';
import Success from './pages/Success';
import ProductEdit from './pages/ProductEdit';
import ProductList from './pages/ProductList';
import ProductAdd from './pages/ProductAdd';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';

const App = () => {
  const user = useSelector((state) => state.user);

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
          {/* {user ? <Redirect to="/" /> : <Register />} */}
          <Register />
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
        <Route path="/admin/productlist">
          {user.isAdmin ? <ProductList /> : <Redirect to="/" />}
        </Route>
        <Route path="/admin/users">
          {user.isAdmin ? <Users /> : <Redirect to="/" />}
        </Route>
        <Route path="/admin/productadd">
          {user.isAdmin ? <ProductAdd /> : <Redirect to="/" />}
        </Route>
        <Route path="/admin">
          {user.isAdmin ? <Admin /> : <Redirect to="/" />}
        </Route>

        <Route path="/product/:id">
          <ProductEdit />
        </Route>
        <Route path="/users/:id">
          <UserEdit />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
