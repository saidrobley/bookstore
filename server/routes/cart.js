const express = require('express');
const router = express.Router();

const CartService = require('../services/CartService');
const CartServiceInstance = new CartService();

const checkAuthentication = require('../services/checkAuthentication');

router.get('/self', checkAuthentication, async (req, res, next) => {
  try {
    const { id } = req.user;

    const response = await CartServiceInstance.loadCart(id);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/self', checkAuthentication, async (req, res, next) => {
  try {
    const { id } = req.user;

    const response = await CartServiceInstance.get({ id });
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

router.post('/self', checkAuthentication, async (req, res, next) => {
  try {
    const { id } = req.user;

    const response = await CartServiceInstance.create({ userId: id });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

router.post('/self/items', checkAuthentication, async (req, res, next) => {
  try {
    const { id } = req.user;
    const data = req.body;

    const response = await CartServiceInstance.addItem(id, data);

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/self/items/:cartItemId', async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const data = req.body;

    const response = await CartServiceInstance.updateItem(cartItemId, data);

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/self/items/:cartItemId',
  checkAuthentication,
  async (req, res, next) => {
    try {
      const { cartItemId } = req.params;

      const response = await CartServiceInstance.removeItem(cartItemId);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/self/checkout', checkAuthentication, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { cartId, paymentInfo } = req.body;

    const response = await CartServiceInstance.checkout(
      cartId,
      id,
      paymentInfo
    );
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
