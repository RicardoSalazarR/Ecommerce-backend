const {order, products_in_order} = require("../models");

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
        where: { user_id:userId },
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
      const result = await order.update({ purchased: true }, { where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = orderService;
