import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const LeftMenu = () => {
  return (
    <Left>
      <LinkItem>
        <Link to="/admin">Products</Link>
      </LinkItem>
      <LinkItem>
        <Link to="/admin/users">Users</Link>
      </LinkItem>
      <LinkItem>
        <Link to="/admin/productadd">Add New Product</Link>
      </LinkItem>
      <LinkItem>
        <Link to="/admin/delete">Delete</Link>
      </LinkItem>
    </Left>
  );
};
const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #e5e5e5;
  background: teal;
  text-decoration: none;
  justify-content: space-around;

  height: 50vh;
  margin-top: 1px;
  margin-right: 20px;
`;
const LinkItem = styled.button`
  padding-top: 1rem;
  border: none;
  background: teal;
  border-bottom: 1px solid white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    padding: 1px 55px;
    pointer: cursor;
  }
`;
export default LeftMenu;
