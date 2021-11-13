import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { update } from '../../../redux/userSlice';
import { useHistory } from 'react-router-dom';

const Register = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
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

    // set the store
  };
  return (
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
      <div>
        <label>address1:</label>
        <input
          type="text"
          name="address1"
          placeholder="Address1"
          required
          value={user.address1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>address2:</label>
        <input
          type="text"
          name="address2"
          placeholder="Address2"
          required
          value={user.address2}
          onChange={handleChange}
        />
      </div>

      <div className="submit">
        {/* <button type="submit">Register</button> */}
        <input type="submit" name="submit" value="Submit" />
      </div>
    </Form>
  );
};

export default Register;
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

// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       firstName: '',
//       lastName: '',
//       address1: '',
//       address2: '',
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   async handleSubmit(e) {
//     e.preventDefault();
//     this.setState({
//       email: this.state.email.toLowerCase(),
//     });

//     const userData = {
//       email: this.state.email.toLowerCase(),
//       password: this.state.password,
//       firstName: this.state.firstName,
//       lastName: this.state.lastName,
//       address1: this.state.address1,
//       address2: this.state.address2,
//     };
//     this.setState({
//       email: userData.email,
//       password: userData.password,
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       address1: userData.address1,
//       address2: userData.address2,
//     });
//     console.log('user from register react:', userData);
//     console.log('state..', this.state);
//     return this.props.registerUser(userData);
//   }
//   handleChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   }

//   render() {
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <h1>Register</h1>
//         <div className="email">
//           <label>email:</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required="true"
//             value={this.state.email}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="password">
//           <label>password:</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required="true"
//             value={this.state.password}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             required="true"
//             value={this.state.firstName}
//             onChange={this.handleChange}
//           />
//         </div>

//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             required="true"
//             value={this.state.lastName}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div>
//           <label>address1:</label>
//           <input
//             type="text"
//             name="address1"
//             placeholder="Address1"
//             required="true"
//             value={this.state.address1}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div>
//           <label>address2:</label>
//           <input
//             type="text"
//             name="address2"
//             placeholder="Address2"
//             required="true"
//             value={this.state.address2}
//             onChange={this.handleChange}
//           />
//         </div>

//         <div className="submit">
//           {/* <button type="submit">Register</button> */}
//           <input type="submit" name="submit" value="Submit" />
//         </div>
//       </Form>
//     );
//   }
// }

// export default Register;

// const Form = styled.form`
//   box-sizing: border-box;
//   width: 50%;
//   margin: 0 auto;
//   margin-top: 2rem;
//   h1 {
//     text-align: center;
//     text-transform: uppercase;
//   }
//   input[type='text'] {
//     width: 100%;
//     padding: 12px;
//     border: 1px solid #ccc;
//     border-readius: 4px;
//     resize: vertical;
//   }
//   input[type='email'] {
//     width: 100%;
//     padding: 12px;
//     border: 1px solid #ccc;
//     border-readius: 4px;
//     resize: vertical;
//   }
//   input[type='password'] {
//     width: 100%;
//     padding: 12px;
//     border: 1px solid #ccc;
//     border-readius: 4px;
//     resize: vertical;
//   }
//   input[type='submit'] {
//     width: 100%;
//     padding: 12px;
//     border: 1px solid #ccc;
//     border-readius: 4px;
//     resize: vertical;
//     margin-top: 2rem;
//     margin-bottom: 2rem;
//     background: #2ea823;
//     cursor: pointer;
//     color: white;
//     text-transform: uppercase;
//   }
//   label {
//     padding: 12px 12px 12px 0;
//     display: inline-block;
//     text-transform: uppercase;
//   }
// `;
