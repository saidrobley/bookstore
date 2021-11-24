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
      console.log('response', response);
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

  ${
    '' /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  } */
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  text-align: center;
`;
const ProductItem = styled.div`
  flex: 2;
`;
