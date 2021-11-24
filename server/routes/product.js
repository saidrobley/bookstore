const express = require('express');
const router = express.Router();

const ProductService = require('../services/ProductService');
const ProductServiceInstance = new ProductService();
const checkAuthentication = require('../services/checkAuthentication');

router.get('/', async (req, res, next) => {
  try {
    //const queryParams = req.query;
    const response = await ProductServiceInstance.getAllProducts();
    res.status(200).json(response);
    //}
    // res.json({ products: { err: 'Please login!!!' } });
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  console.log('inside products/id');
  try {
    console.log('product', req.params);
    const { productId } = req.params;

    const response = await ProductServiceInstance.getProductById(productId);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const item = req.body;
    const response = await ProductServiceInstance.addItem(item);
    if (response) {
      console.log(response);
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

// update
router.post('/:productId', async (req, res) => {
  console.log('product:,', req.body);
  req.body.quantity = Number(req.body.quantity);
  console.log('product::::', req.body);
  try {
    const response = await ProductServiceInstance.updateItem(req.body);
    if (response) {
      console.log(response);
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
  }
});
//delete
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await ProductServiceInstance.deleteItem(productId);
    if (response) {
      console.log(response);
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
