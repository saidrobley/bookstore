import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import { Add, Remove } from '@material-ui/icons';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        console.log('response', response.data.product);
        setProduct(response.data.product);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    console.log('before adding to cart', cart);
    console.log('product: ', product, 'quantity', quantity);
    dispatch(
      addProduct({ ...product, quantity, price: product.price * quantity })
    );
    console.log('after adding to cart', cart);
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.image_url} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>

    // <ProductItem>
    //   <p>{product.name}</p>

    //   <img alt={product.name} src={product.image_url} />

    //   <p>{product.description}</p>
    //   <p>${product.price}</p>
    // </ProductItem>
  );
};

export default Product;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items; center;
  justify-content: space-between;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;
