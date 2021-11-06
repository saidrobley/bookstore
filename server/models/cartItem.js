const db = require('../db');

module.exports = class CartItemModel {
  /**
   * Creates a new cart line item
   * @param  {Object}      data [Cart item data]
   * @return {Object|null}      [Created cart item]
   */
  /*
id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      cartId          INT             NOT NULL,
      productId       INT             NOT NULL,
      qty             INT             DEFAULT 1,
      FOREIGN KEY (cartId) REFERENCES carts(id),
      FOREIGN KEY (productId) REFERENCES products(id)
  */
  static async create(data) {
    try {
      const result = await db.query(
        `INSERT INTO cartItems (cartId, productId, qty)
                 VALUES($1, $2, $3) RETURNING *`,
        [data.cartId, data.productId, data.qty]
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
   * Updates existing cart item
   * @param  {Object}      data [Cart item data]
   * @param  {Object}      id   [Cart item id]
   * @return {Object|null}      [Updated cart item]
   */
  //  `UPDATE orders SET total=$1, status=$2 where id=$3`,
  //       [data.total, data.status, data.id]
  static async update(id, data) {
    try {
      const res = await db.query(
        `UPDATE cartItems 
          SET productId=$1, qty=$2 
          WHERE id=$3`,
        [data.productId, data.qty, id]
      );
      // Generate SQL statement - using helper for dynamic parameter injection
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(data, null, 'cartItems') + condition;

      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieve cart items for a cart
   * @param  {Object} cartId [Cart ID]
   * @return {Array}         [Created cart item]
   */
  static async find(cartId) {
    try {
      // Generate SQL statement
      const result = await db.query(
        // `SELECT
        //                     ci.qty,
        //                     ci.id AS "cartItemId",
        //                     p.*
        //                  FROM cartItems ci
        //                  INNER JOIN products p ON p.id = ci.productId
        //                  WHERE cartId = $1`,
        `
        SELECT cartItems.qty, cartItems.id, products.*
        FROM cartItems
        INNER JOIN products ON products.id = cartItems.productId
        WHERE cartId = $1`,
        [cartId]
      );
      /* 
        SELECT cartItems.qty, cartItems.id, products.*
        FROM cartItems
        INNER JOIN products ON products.id = cartItems.productId
        WHERE cartId = $1, [cartId]
      */

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes a cart line item
   * @param  {Object}      id [Cart item ID]
   * @return {Object|null}    [Deleted cart item]
   */
  static async delete(id) {
    console.log('inside delete id', id);
    try {
      // Generate SQL statement
      const result = await db.query(
        `DELETE
                         FROM cartItems
                         WHERE cartId = $1
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
