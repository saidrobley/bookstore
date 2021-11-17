import Navbar from '../components/Navbar/Navbar';
import React from 'react';
import Products from '../components/products/Products';
require('dotenv').config();

const Home = () => {
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default Home;
