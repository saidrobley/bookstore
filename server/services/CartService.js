'use strict';
// contains static methods
const CartModel = require('../models/cart');
const CartItemModel = require('../models/cartItem');
const OrderModel = require('../models/order');

module.exports = class CartService {
  // create a cart for the user
  async create(data) {
    const { userId } = data;

    try {
      // create a cart for user
      const cart = await CartModel.create(userId);
      return cart;
    } catch (err) {
      throw err;
    }
  }

  // get items in the cart.
  async loadCart(userId) {
    try {
      // get user cart based on ID
      const cart = await CartModel.findOneByUser(userId);

      // load cart items and add them to the cart
      const items = await CartItemModel.find(cart.id);
      cart.items = items;

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async addItem(userId, item) {
    try {
      // Load user cart based on ID
      const cart = await CartModel.findOneByUser(userId);

      // Create cart item
      const cartItem = await CartItemModel.create({ cartId: cart.id, ...item });

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async removeItem(cartItemId) {
    try {
      // Remove cart item by line ID
      const cartItem = await CartItemModel.delete(cartItemId);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async updateItem(cartItemId, data) {
    try {
      // Remove cart item by line ID
      const cartItem = await CartItemModel.update(cartItemId, data);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async checkout(cartId, userId, paymentInfo) {
    try {
      const stripe = require('stripe')('sk_test_FOY6txFJqPQvJJQxJ8jpeLYQ');

      const cartItems = await CartItemModel.find(cartId);

      const total = cartItems.reduce((acc, item) => {
        return acc + parseFloat(item.price) * parseInt(item.qty, 10);
      }, 0);

      // Generate initial order
      const Order = new OrderModel({ total: total, userId: userId });

      await Order.addItems(cartItems);

      await Order.create();

      // On successful charge to payment method, update order status to COMPLETE
      const order = await Order.update({ status: 'COMPLETE', userId: userId });
      await CartItemModel.delete(cartId);
      await CartModel.delete(cartId);
      return order;
    } catch (err) {
      throw err;
    }
  }
};
