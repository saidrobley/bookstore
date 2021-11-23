import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

const ProductEdit = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
  });

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const res = await axios.get(`/products/${id}`);
        console.log('item', res.data);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct(productId);
  }, [productId]);
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('product: ', product);
    try {
      const res = await axios.post(`/products/${productId}`, product);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Edit</h1>
      <InputItem
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
      />
      <InputItem
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
      />
      <InputItem
        type="text"
        name="price"
        value={product.price}
        onChange={handleChange}
      />
      <InputItem
        type="text"
        name="image_url"
        value={product.image_url}
        onChange={handleChange}
      />
      <InputItem type="submit" name="submit" value="Edit" />
    </Form>
  );
};
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 20px auto;
`;
const InputItem = styled.input`
  padding: 10px;
  margin: 2px;
`;

export default ProductEdit;
