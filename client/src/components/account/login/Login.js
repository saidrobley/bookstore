import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';

const Login = (props) => {
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log('logged in user', loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      setUser({
        email: foundUser.email,
      });
      console.log('foundUser....', foundUser);
      console.log('after setUser', user);
      history.push('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    console.log('user inside regist react', user);
    props.loginUser(user);
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <h1>login</h1>
      <div className="email">
        <span>email:</span>
        <input
          type="email"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="password">
        <span>password:</span>{' '}
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <div className="submit">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
