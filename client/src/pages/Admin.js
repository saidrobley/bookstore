import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LeftMenu from '../components/LeftMenu/LeftMenu';
import Navbar from '../components/Navbar/Navbar';
import ProductList from './ProductList';

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <LeftMenu />
        <Right>
          <ProductList />
        </Right>
      </Container>
      {/* <ProductList /> */}
    </div>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const Right = styled.div`
  flex: 4;

  height: 70vh;
`;

export default Admin;
