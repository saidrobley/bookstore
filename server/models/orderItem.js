const db = require('../db/index');
const moment = require('moment');

module.exports = class OrderItemModel {
  constructor(data = {}, userId = null) {
    this.name = data.name;
    this.price = data.price || 0;
    this.description = data.description;
    this.qty = data.quantity || 1;
    this.orderId = userId || null;

    this.created = data.created || moment.utc().toISOString();

    this.modified = moment.utc().toISOString();

    this.productId = data.productId;
  }

  /**
   * @param {Object}          data  [Order item data]
   * @return {Object|null}          [Created order item]
   */

  static async create(data) {
    try {
      const orderItem = db.query(
        'INSERT INTO orderItems (qty, price, name, description, orderId, productId) values ($1, $2, $3, $4, $5, $6) ',
        [
          data.qty,
          data.price,
          data.name,
          data.description,
          data.orderId,
          data.productId,
        ]
      );
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Retrieve order items for an order
   * @param  {Object} orderId [Order ID]
   * @return {Array}          [Created cart item]
   */

  static async find(orderId) {
    try {
      const result = await db.query(
        `SELECT 
          orderItems.qty, 
          orderItems.id, 
          products.* FROM orderItems
          INNER JOIN products on products.id = orderItems.productId
          WHERE orderId = $1`,
        [orderId]
      );

      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      console.log(err);
    }
  }
};
