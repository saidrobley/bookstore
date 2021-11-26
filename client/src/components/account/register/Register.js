import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { update } from '../../../redux/userRedux';
import { useHistory } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const Register = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // call backend to register user.
    const response = await axios.post('/auth/register', user);
    if (response.data.email) {
      // update the store.
      const userState = {
        email: response.data.email,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
      };
      dispatch(update(userState));
      history.push('/');
    }
  };
  return (
    <div>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="email">
          <label>email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="password">
          <label>password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={user.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={user.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="submit">
          {/* <button type="submit">Register</button> */}
          <input type="submit" name="submit" value="Submit" />
        </div>
      </Form>
    </div>
  );
};
const Form = styled.form`
  box-sizing: border-box;
  width: 50%;
  margin: 0 auto;
  margin-top: 2rem;
  h1 {
    text-align: center;
    text-transform: uppercase;
  }
  input[type='text'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-readius: 4px;
    resize: vertical;
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
  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
    text-transform: uppercase;
  }
`;

export default Register;
