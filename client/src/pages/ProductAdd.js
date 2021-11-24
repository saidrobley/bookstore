import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styled from 'styled-components';
import axios from 'axios';

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    image_url: '',
  });
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('product', product);
    try {
      const res = await axios.post('/products', product);
      console.log('res data', res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <h1>Add</h1>
        <InputItem
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
        />
        <InputItem
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <InputItem
          type="text"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <InputItem
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <InputItem
          type="text"
          name="image_url"
          placeholder="Image Url"
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
          value="Add"
        />
      </Form>
    </div>
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
export default ProductAdd;
