import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ProductForm(props) {
  let history = useHistory();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
  });

  //name, price, description, image_url

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = axios.post('/products', product);
    console.log('response', response.data);
    history.push('/product/add');
    setProduct({
      name: '',
      price: '',
      description: '',
      image_url: '',
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add a New Product</h1>
      <div className="name">
        <label>name:</label>
        <input
          type="text"
          name="name"
          placeholder="name"
          required="true"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div className="name">
        <label>price:</label>
        <input
          type="text"
          name="price"
          placeholder="price"
          required="true"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      <div className="name">
        <label>description:</label>
        <input
          type="text"
          name="description"
          placeholder="description"
          required="true"
          value={product.description}
          onChange={handleChange}
        />
      </div>
      <div className="name">
        <label>Image url:</label>
        <input
          type="text"
          name="image_url"
          placeholder="Image"
          required="true"
          value={product.image_url}
          onChange={handleChange}
        />
      </div>

      <div className="submit">
        <input type="submit" name="submit" value="Submit" />
      </div>
    </Form>
  );
}

export default ProductForm;
const Form = styled.form`
  box-sizing: border-box;
  width: 50%;
  margin: 0 auto;
  margin-top: 2rem;
  h1 {
    text-align: center;
    text-transform: uppercase;
  }
  input[type='text'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-readius: 4px;
    resize: vertical;
  }
  input[type='email'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-readius: 4px;
    resize: vertical;
  }
  input[type='password'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-readius: 4px;
    resize: vertical;
  }
  input[type='submit'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-readius: 4px;
    resize: vertical;
    margin-top: 2rem;
    margin-bottom: 2rem;
    background: #2ea823;
    cursor: pointer;
    color: white;
    text-transform: uppercase;
  }
  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
    text-transform: uppercase;
  }
`;
