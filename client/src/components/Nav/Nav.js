import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory, Redirect } from 'react-router-dom';

const Nav = (props) => {
  const [user, setUser] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log('logged in user', loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      console.log('found user ', foundUser);
      setUser({
        email: foundUser.email,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
      });
      <Redirect to="/" />;
    }
  }, [user.email]);

  const handleLogout = () => {
    props.logoutUser();
  };

  return (
    <Navigation>
      <Logo>
        <LogoButton>
          <Link style={{ textDecoration: 'none' }} to="/">
            Logo
          </Link>
        </LogoButton>
      </Logo>
      <UnorderedList>
        <ListItem>
          <Link style={{ textDecoration: 'none' }} to="/">
            Home
          </Link>
        </ListItem>

        {props.user.email && (
          <ListItem>
            <Link style={{ textDecoration: 'none' }} to="/">
              {props.user.email}
            </Link>
          </ListItem>
        )}

        <ListItem>
          {props.user.email ? (
            <Link
              style={{ textDecoration: 'none' }}
              to="/"
              onClick={handleLogout}
            >
              logout
            </Link>
          ) : (
            <Link style={{ textDecoration: 'none' }} to="/account/login">
              Login
            </Link>
          )}
        </ListItem>
      </UnorderedList>
    </Navigation>
  );
};

export default Nav;
const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
`;
// export const Wrap = styled.div`
//   background-color: red;
//   margin: auto;
//   width: 90%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;
const Logo = styled.div``;
const LogoButton = styled.button`
  padding: 0.5rem 2rem;
  border-radius: 10px;
  font-weight: 600;
`;
const UnorderedList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  padding-left: 2rem;
`;
