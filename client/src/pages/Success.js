import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../redux/cartRedux';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const Success = () => {
  const location = useLocation();
  let data = location.state.stripeData;
  let products = location.state.products;

  const cart = useSelector((state) => state.cart);

  const currentUser = useSelector((state) => state.user);
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res =
          cart.products.length &&
          (await axios.post('/orders', {
            userId: currentUser.id,
            products: cart.products.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              description: item.description,
              quantity: item.quantity,
            })),
            total: cart.total,
          }));
        await setOrderId(res.data.id);
        await setOrder(res.data);
        await dispatch(removeProduct({ products: [], quantity: 0, total: 0 }));
      } catch (err) {
        console.log(err);
      }
    };

    data && createOrder();
  }, [cart, data, currentUser]);
  return (
    <div>
      <Navbar />
      {order.items && (
        <div>
          <div>
            <p>Success</p>
            <p>Order Number: {order.id}</p>
            <p>Total: ${order.total}</p>
            <p>userId: {order?.userid}</p>
          </div>

          {order.items?.map((item) => (
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
