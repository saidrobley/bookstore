import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Wrap from '../Nav/Nav';

import styled from 'styled-components';

function Products(props) {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log('logged in user', loggedInUser);
      const foundUser = JSON.parse(loggedInUser);

      //setUser(foundUser);
    }
  }, []);
  useEffect(() => {
    fetchProducts();
    setEmail(props.email);
  }, [props.email]);

  const fetchProducts = async () => {
    axios
      .get('/products')
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products &&
          products.map((product) => {
            return (
              <div className="product-item" key={product.id}>
                <p>{product.name}</p>

                <img alt={product.name} src={product.image_url} />

                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
