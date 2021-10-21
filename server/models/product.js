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
  // const result = await db.query(
  //             'INSERT INTO users (email, password, firstName, lastName) values($1, $2, $3, $4) returning *',
  //             [user.email, hash, user.firstName, user.lastName]
  //           );
  // id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  //       name            VARCHAR(50)     NOT NULL,
  //       price           BIGINT          NOT NULL,
  //       description     VARCHAR(50)     NOT NULL

  async addItem(item) {
    try {
      const result = await db.query(
        'INSERT INTO products (name, price, description) values($1, $2, $3) returning *',
        [item.name, item.price, item.description]
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
      const statement = `SELECT * FROM product WHERE id = $1`;

      const user = await db.query('SELECT * FROM products where id = $1', [id]);
      return user.rows[0];
    } catch (err) {
      throw err;
    }
  }
};
