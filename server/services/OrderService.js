const createError = require('http-errors');
const OrderModel = require('../models/order');
const OrderItemModel = require('../models/orderItem');
//const OrderInstance = new OrderModel();
//const OrderItemInstance = new OrderItemModel();

module.exports = class OrderService {
  async createOrder(data) {
    //const {userId, total} = data;
    try {
      const Order = new OrderModel(data);

      const order = await Order.create();
      //const res = await OrderInstance.createOrder(data);

      if (res) {
        return res;
      }
    } catch (err) {
      throw err;
    }
  }

  async list(userId) {
    try {
      const orders = await OrderModel.findByUser(userId);
      return orders;
    } catch (err) {
      throw err;
    }
  }

  async findById(orderId) {
    try {
      const order = await OrderModel.findById(orderId);
      return order;
    } catch (err) {
      throw err;
    }
  }
};
