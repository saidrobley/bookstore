import React from 'react';
import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../redux/userRedux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  //console.log(quantity);
  const user = useSelector((state) => state.user);
  //console.log('user from nav', user);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>
            <Link style={{ textDecoration: 'none' }} to="/">
              Logo
            </Link>
          </Logo>
        </Left>
        <Right>
          <MenuItem>
            <Link style={{ textDecoration: 'none' }} to="/">
              Home
            </Link>
          </MenuItem>

          <MenuItem>
            {user.email ? (
              <Logout
                style={{ textDecoration: 'none' }}
                onClick={() =>
                  dispatch(update({ email: '', firstname: '', lastname: '' }))
                }
              >
                Logout
              </Logout>
            ) : (
              <Link style={{ textDecoration: 'none' }} to="/account/login">
                Login
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {!user.email ? (
              <Link style={{ textDecoration: 'none' }} to="/account/register">
                Register
              </Link>
            ) : (
              <Link style={{ textDecoration: 'none' }} to="/">
                {user.email}
              </Link>
            )}
          </MenuItem>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity}>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  background-color: teal;
  margin-bottom: 2rem;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Logo = styled.p`
  font-weight: bold;
  a {
    color: white;
    text-transform: uppercase;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 35px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
  a {
    color: white;
    text-transform: uppercase;
    font-weight: bold;
  }
`;
const Logout = styled.p`
  font-weight: bold;
  color: white;
  text-transform: uppercase;
`;
