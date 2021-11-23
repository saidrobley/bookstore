const db = require('../db/index');
const createError = require('http-errors');
module.exports = class ProductModel {
  /**
   * List products
   * @return {Array}         [Array of products]
   */
  //async find(options = {}) {
  async find() {
    try {
      const result = await db.query('SELECT * FROM products');
      //const result = `SELECT * FROM products`;
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async updateItem(item) {
    try {
      const result = await db.query(
        'UPDATE products set name=$1, price=$2, description=$3, image_url=$4 WHERE id=$5 returning *',
        [item.name, item.price, item.description, item.image_url, item.id]
      );
      if (result.rows?.length) {
        return result.rows[0];
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addItem(item) {
    try {
      const result = await db.query(
        'INSERT INTO products (name, price, description, image_url) values($1, $2, $3, $4) returning *',
        [item.name, item.price, item.description, item.image_url]
      );
      if (result.rows?.length) {
        return result.rows[0];
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Retrieve product by ID
   * @param {Object}        id [Product ID]
   * @return {Object|null}     [Product record]
   */
  async findOne(id) {
    try {
      const result = await db.query(`SELECT * FROM products WHERE id = $1`, [
        id,
      ]);
      if (result.rows?.length) {
        return result.rows[0];
      }
    } catch (err) {
      throw err;
    }
  }
};
