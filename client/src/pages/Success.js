import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const products = location.state.products;
  console.log('products', products);
  console.log('data', data);
  const cart = useSelector((state) => state.cart);

  const currentUser = useSelector((state) => state.user);
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post('/orders', {
          userId: currentUser.id,
          products: cart.products.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            quantity: item.quantity,
          })),
          total: cart.total,
        });
        setOrderId(res.data.id);
        setOrder(res.data);
        console.log('res:..', res.data);
        console.log(typeof res.data.items[0]);
        console.log(res.data.items[0]['name']);
        //const itemss = JSON.parse(res.data.items);
        //console.log(itemss);
      } catch (err) {
        console.log(err);
      }
    };

    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div>
      <Navbar />
      {order.id && (
        <div>
          <p>Success</p>
          <p>Order Number: {order.id}</p>
          <p>Total: ${order.total}</p>
          <p>userId: {order.userid}</p>
          {order.items.map((item) => (
            <div>
              <p>================</p>
              <p>Title: {item.name}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.qty}</p>
              <p>=========================</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Success;
