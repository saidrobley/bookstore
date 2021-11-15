import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../../../redux/userRedux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../Navbar/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');

  const dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    try {
      const response = await axios.post('/auth/login', userData);
      if (response.data.email) {
        console.log(response.data);
        dispatch(update(response.data));
        history.push('/');
      } else {
        console.log('err', response.data.err);
        setError(response.data.err);
        //setError('Incorrect username or password');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Form onSubmit={handleSubmit} className="login-container">
        <h1>login</h1>
        <div className="email">
          <label>email:</label>
          <input
            type="email"
            name="username"
            placeholder="Email"
            required
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="password">
          <label>password:</label>{' '}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <div className="submit">
          <div className="submit">
            {/* <button type="submit">Register</button> */}
            <input type="submit" name="submit" value="Submit" />
          </div>
        </div>
        {err && <p style={{ color: 'red' }}>{err}</p>}
      </Form>
    </div>
  );
};

export default Login;
const Form = styled.form`
  box-sizing: border-box;
  width: 50%;
  margin: 0 auto;
  margin-top: 2rem;
  h1 {
    text-align: center;
    text-transform: uppercase;
  }
  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
    text-transform: uppercase;
  }
  input[type='submit'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-readius: 4px;
    resize: vertical;
    margin-top: 2rem;
    margin-bottom: 2rem;
    background: #2ea823;
    background: teal;
    cursor: pointer;
    color: white;
    text-transform: uppercase;
  }
  input[type='email'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-readius: 4px;
    resize: vertical;
  }
  input[type='password'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-readius: 4px;
    resize: vertical;
  }
`;
