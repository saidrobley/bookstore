const createError = require('http-errors');
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  // all items.
  async getAllProducts() {
    try {
      //const products = await ProductModelInstance.find(options);
      const products = await ProductModelInstance.find();
      return products;
    } catch (err) {
      throw err;
    }
  }

  // retrieves product
  async getProductById(id) {
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
  // adds product to db
  async addItem(data) {
    try {
      return await ProductModelInstance.addItem(data);
    } catch (err) {
      console.log(err);
    }
  }
  // update product
  async updateItem(data) {
    try {
      return await ProductModelInstance.updateItem(data);
    } catch (err) {
      console.log(err);
    }
  }
  // delete item
  async deleteItem(id) {
    try {
      return await ProductModelInstance.delete(id);
    } catch (err) {
      console.log(err);
    }
  }
};
