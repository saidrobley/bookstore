'use strict';
const db = require('../db');
const moment = require('moment');
const OrderItem = require('./orderItem');
const { updateLocale } = require('moment');
const CartItemModel = require('./cartItem');

module.exports = class OrderModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.items = data.items || [];
    this.modified = moment.utc().toISOString();
    this.status = data.status || 'PENDING';
    this.total = data.total || 0;
    this.userId = data.userId || null;
  }

  async addItems(items) {
    //console.log('items,,,,,,: ', items);
    this.items = await items.map((item) => new OrderItem(item));
    //this.items = await items.map((item) => new CartItemModel(item));
    console.log('end of addItems');
  }

  // create order
  async create() {
    console.log('inside create');
    try {
      const result = await db.query(
        `INSERT INTO orders (created, modified, status, total, userId)
        VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [this.created, this.modified, this.status, this.total, this.userId]
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
    console.log('inside order.update');
    //console.log('data: ', data);
    //console.log('userId', userId);
    console.log('data', data);
    //console.log('userId', userId);
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
