const models = require("../models");
const { order, productInOrder } = models;

class orderService {
  static async buyCart(data) {
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
        productAdded = await productInOrder.create(product);
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
        where: { userId },
        include: {
          model: productInOrder,
          as: "productsInOrder",
          attributes: ["productId", "quantity", "price", "status"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async purchase(id) {
    try {
      const result = await order.update({ status: true }, { where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = orderService;
