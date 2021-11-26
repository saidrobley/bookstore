import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Product from './Product';

function Products(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <h1>BOOKS</h1>

      <Container>
        {products &&
          products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
      </Container>
    </Wrapper>
  );
}

export default Products;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  text-align: center;
`;
const ProductItem = styled.div`
  flex: 2;
`;
