import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProductList from './ProductList';

const Admin = () => {
  return (
    <div>
      <Navbar />
      <ProductList />
    </div>
  );
};

export default Admin;
