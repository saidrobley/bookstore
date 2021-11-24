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
      const result = await db.query('SELECT * FROM products ORDER BY id');
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
        'UPDATE products set name=$1, price=$2, quantity=$3, description=$4, image_url=$5 WHERE id=$6 returning *',
        [
          item.name,
          item.price,
          item.quantity,
          item.description,
          item.image_url,
          item.id,
        ]
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
        'INSERT INTO products (name, price, description, quantity, image_url) values($1, $2, $3, $4, $5) returning *',
        [item.name, item.price, item.description, item.quantity, item.image_url]
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
  async delete(id) {
    console.log('inside delete model', id);
    try {
      const result = await db.query('DELETE FROM products where id=$1', [id]);
      if (result.rows?.length) {
        return result.rows[0];
      }
    } catch (err) {
      console.log(err);
    }
  }
};
