const db = require('../db');
const moment = require('moment');

module.exports = class CartModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.modified = moment.utc().toISOString();
    this.converted = data.converted || null;
    this.isActive = data.isActive || true;
  }

  static async create(userId) {
    try {
      const data = { userId, ...this };

      const result = db.query(`INSERT INTO carts (userId) values($1)`, [
        data.userId,
      ]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Loads a cart by User ID
   * @param  {number}      id [User ID]
   * @return {Object|null}    [Cart record]
   */
  static async findOneByUser(userId) {
    try {
      // Generate SQL statement
      const result = await db.query(
        `SELECT *
            FROM carts
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

  /**
   * Loads a cart by ID
   * @param  {number}      id [Cart ID]
   * @return {Object|null}    [Cart record]
   */
  static async findOneById(id) {
    try {
      // Generate SQL statement
      const result = await db.query(
        `SELECT *
                         FROM carts
                         WHERE id = $1`,
        [id]
      );

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async delete(id) {
    try {
      // Generate SQL statement
      const result = await db.query(
        `DELETE
                         FROM carts
                         WHERE id = $1
                         RETURNING *`,
        [id]
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
