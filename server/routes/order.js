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
/*
      total           DECIMAL(10,2)   NOT NULL,
      status          VARCHAR(50)     NOT NULL,
      userId          INT             NOT NULL,
*/

router.get('/:ordeId', checkAuthentication, async (req, res, next) => {
  // if (req.user) {
  //   console.log('llll');
  //   console.log('user:', req.user.id);
  // }
  try {
    const orderId = req.params.ordeId;

    const response = await OrderServiceInstance.getOrderById(orderId);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
