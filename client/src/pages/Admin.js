import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import ProductList from './ProductList';

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <LinkItem>
          <Link to="/admin/productlist">Edit</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/admin/productadd">Add</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/admin/delete">Delete</Link>
        </LinkItem>
      </Container>
      {/* <ProductList /> */}
    </div>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LinkItem = styled.div`
  flex: 1;
  text-align: center;
`;
export default Admin;
