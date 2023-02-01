const { where } = require("sequelize");
const { order, products_in_order } = require("../models");

class orderService {
  static async createOrder(data) {
    try {
      const result = await order.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static addProductInOrder(products) {
    try {
      let productAdded = "";
      let allGod = true;
      products.forEach(async (product) => {
        productAdded = await products_in_order.create(product);
        if (!productAdded) {
          !allGod;
        }
        productAdded = "";
      });
      return allGod;
    } catch (error) {
      throw error;
    }
  }

  static async getOrders(userId) {
    try {
      const result = order.findAll({
        where: { user_id: userId },
        include: {
          model: products_in_order,
          as: "productsInOrder",
          attributes: ["product_id", "quantity", "price", "purchased"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async purchase(id) {
    try {
      await order.update({ purchased: true }, { where: { id } });
      const result = await products_in_order.update(
        { purchased: true },
        { where: { order_id: id } }
      ); //revisar
      const products = await products_in_order.findAll({
        where: { order_id: id },
      });
      const productsArray = [];
      for (const product of products) {
        const { product_id, quantity } = product;
        productsArray.push({ product_id, quantity });
      }
      if (result) {
        return productsArray;
        //falta restar quantity
      }
      return "";
    } catch (error) {
      throw error;
    }
  }

  static async isValid(orderId, userId) {
    try {
      const { user_id, purchased } = await order.findByPk(orderId);
      const response = {}
      if (userId === user_id) {
        if (!purchased) {
         response.status='ok'
        }else{
          response.status='already purchased'
        }
      }else{
        response.status='is not yours'
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = orderService;
