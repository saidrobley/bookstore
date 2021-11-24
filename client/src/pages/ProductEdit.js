import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import LeftMenu from '../components/LeftMenu/LeftMenu';

const ProductEdit = () => {
  const location = useLocation();
  const history = useHistory();
  const productId = location.pathname.split('/')[2];
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
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

      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />

      <Container>
        <LeftMenu />
        <Form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center' }}>Edit</h1>
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
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
          <InputItem
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
          />
          <InputItem
            style={{
              background: 'teal',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            type="submit"
            name="submit"
            value="Edit"
          />
        </Form>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  height: 50vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 4;
`;
const InputItem = styled.input`
  padding: 10px;
  margin: 2px;
`;

export default ProductEdit;
