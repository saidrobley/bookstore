const createError = require('http-errors');
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async list() {
    try {
      //const products = await ProductModelInstance.find(options);
      const products = await ProductModelInstance.find();
      return products;
    } catch (err) {
      throw err;
    }
  }

  async get(id) {
    try {
      const product = await ProductModelInstance.findOne(id);

      if (!product) {
        throw createError(404, 'Product not found');
      }

      return product;
    } catch (err) {
      throw err;
    }
  }
  async addItem(data) {
    try {
      return await ProductModelInstance.addItem(data);
    } catch (err) {
      console.log(err);
    }
  }
};