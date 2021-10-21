const express = require('express');
const router = express.Router();

const ProductService = require('../services/ProductService');
const ProductServiceInstance = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const queryParams = req.query;

    const response = await ProductServiceInstance.list();
    res.status(200).json({
      products: response,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    const response = await ProductServiceInstance.get(productId);
    res.status(200).json({
      product: response,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const item = req.body;
    console.log('item', item);
    const response = await ProductServiceInstance.addItem(item);
    if (response) {
      console.log(response);
      res.status(200).json({
        product: response,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
