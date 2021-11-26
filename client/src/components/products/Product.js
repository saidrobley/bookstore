import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <ProductItem key={product?.id}>
      <Link to={`/products/${product?.id}`}>
        <p
          style={{
            display: 'flex',
            height: '50px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {product.name.length > 20
            ? product.name.substring(0, 20) + '....'
            : product.name}
        </p>

        <img alt={product?.name} src={product?.image_url} />

        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {product.description.length > 20
            ? product.description.substring(0, 20) + '....'
            : product.description}
        </p>
        <p style={{ paddingTop: '5px' }}>${product?.price}</p>
      </Link>
    </ProductItem>
  );
};

export default Product;
const ProductItem = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;
`;
