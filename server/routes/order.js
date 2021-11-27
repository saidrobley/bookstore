const express = require('express');
const router = express.Router();
const checkAuthentication = require('../services/checkAuthentication');

const OrderService = require('../services/OrderService');
const OrderServiceInstance = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const { id } = req.user;
    const response = await OrderServiceInstance.getOrdersByUserId(id);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res) => {
  const newOrder = req.body;

  try {
    const response = await OrderServiceInstance.createOrder(newOrder);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:ordeId', checkAuthentication, async (req, res, next) => {
  try {
    const orderId = req.params.ordeId;
    const response = await OrderServiceInstance.getOrderById(orderId);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
