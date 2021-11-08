import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log('before change to lower case');
    console.log(this.state);
    this.setState({
      email: this.state.email.toLowerCase(),
    });

    console.log(this.state);
    console.log('after to lower case');
    const userData = {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address1: this.state.address1,
      address2: this.state.address2,
    };
    this.setState({
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      address1: userData.address1,
      address2: userData.address2,
    });
    console.log('user from register react:', userData);
    console.log('state..', this.state);
    return this.props.registerUser(userData);

    // const response = await axios.post('/auth/register', userData);
    // console.log('response', response.data.user);
    // const { email, password } = response.data.user;
    // const loginUser = {
    //   email,
    //   password,
    // };
    // console.log('loginUser', loginUser);
    // return <Redirect to="/" />;
    //this.props.loginUser(loginUser);
    //this.setState((prevState) => {});

    // const email = response.data.user.email;
    // const password = response.data.user.password;
    // const user = {
    //   username: email,
    //   password: password,
    // };
    // console.log('username, password', user.username, user.password);
    // console.log('user:...', user);
    // await this.props.loginUser(user);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Signin</h1>
        <div className="email">
          <span>email:</span>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            //onChange={({ target }) => this.setState({ email: target.value })}
          />
        </div>
        <div className="password">
          <span>password:</span>{' '}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            //onChange={({ target }) => this.setState({ password: target.value })}
          />
        </div>
        <div>
          <span>First Name:</span>{' '}
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            // onChange={({ target }) =>
            //    this.setState({ firstName: target.value })
            // }
          />
        </div>

        <div>
          <span>Last Name:</span>{' '}
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <span>address1:</span>{' '}
          <input
            type="text"
            name="address1"
            value={this.state.address1}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <span>address2:</span>{' '}
          <input
            type="text"
            name="address2"
            value={this.state.address2}
            onChange={this.handleChange}
          />
        </div>

        <div className="submit">
          <button type="submit">Register</button>
        </div>
      </form>
    );
  }
}

export default Register;
