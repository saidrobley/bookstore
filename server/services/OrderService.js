const createError = require('http-errors');
const OrderModel = require('../models/order');
const OrderItemModel = require('../models/orderItem');
//const OrderInstance = new OrderModel();
//const OrderItemInstance = new OrderItemModel();

module.exports = class OrderService {
  async createOrder(data) {
    const { userId, total, products } = data;
    try {
      const Order = new OrderModel({ total, userId });
      console.log('Order from orderservice', Order);
      console.log('products', products);
      await Order.addItems(products);
      console.log('after adding products', Order);
      const order = await Order.create();
      console.log('order from orderservice', order);
      if (order) {
        return order;
      }
    } catch (err) {
      // console.log('inside order service', data);
      // //const {userId, total} = data;
      // try {
      //   // calls the order model
      //   data.products.forEach((product) => {
      //     let dataRow = {
      //       userId,
      //       total,
      //       productId: product.productId,
      //       quantity: product.quantity,
      //     };
      //     console.log('dataRow', dataRow);
      //     const order = new OrderModel(dataRow);
      //     console.log('order...', order);
      //     this.createNewOrder(order);
      //     // const createdOrder = await order.create();
      //     //console.log('createdOrder', createdOrder);
      //   });

      // const order = new OrderModel(data);
      // console.log('Order to save', order);
      // // put it in the db.
      // const createdOrder = await order.create();
      // console.log('createdOrder', createdOrder);
      // call to save
      //const order = await Order.create();
      //const res = await OrderInstance.createOrder(data);

      // if (res) {
      //   return res;
      // }
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
