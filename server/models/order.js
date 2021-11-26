'use strict';
const db = require('../db');
const moment = require('moment');
const OrderItem = require('./orderItem');
const { updateLocale } = require('moment');
const CartItemModel = require('./cartItem');

module.exports = class OrderModel {
  constructor(data = {}) {
    this.userId = data.userId || null;
    this.items = data.products || [];

    this.total = data.total || 0;

    this.created = data.created || moment.utc().toISOString();
    this.modified = moment.utc().toISOString();
    this.status = data.status || 'PENDING';
  }

  async addItems(items) {
    this.items = await items.map((item) => new OrderItem(item, this.userId));
  }

  // create order
  async create() {
    const data = { ...this };

    try {
      const result = await db.query(
        `INSERT INTO orders (created, modified, status, total, userId, items)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          data.created,
          data.modified,
          data.status,
          data.total,
          data.userId,
          data.items,
        ]
      );
      if (result.rows?.length) {
        return result.rows[0];
      }
      return [];
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      const result = await db.query(
        `UPDATE orders SET status=$1 where userId=$2 RETURNING *`,
        [data.status, data.userId]
      );
      if (result.rows?.length) {
        return result.rows[0];
      }
      return [];
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Loads orders for a user
   * @param  {number} userId [User ID]
   * @return {Array}         [Order records]
   */
  static async findByUser(userId) {
    try {
      // Generate SQL statement
      const result = await db.query(
        `SELECT *
         FROM orders
         WHERE userId = $1`,
        [userId]
      );
      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async findById(orderId) {
    try {
      // Generate SQL statement
      const result = await db.query(
        `SELECT *
         FROM orders
         WHERE id = $1`,
        [orderId]
      );

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
