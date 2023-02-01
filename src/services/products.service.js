const { products, users } = require("../models");
const { Op } = require("@sequelize/core");

class productService {
  static async get() {
    try {
      const result = await products.findAll({
        where: {
          available_qty: {
            [Op.gt]: 0,
          },
        },
        include: {
          model: users,
          as: "user",
          attributes: ["username"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(product) {
    try {
      const result = await products.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static updateQty(productsArray) {
    productsArray.forEach(async (product) => {
      const { id, available_qty } = await products.findByPk(product.product_id);
      const newQty = available_qty - product.quantity;
      let status = true;
      if (newQty <= 0) {
        status = false;
      }
      await products.update(
        { available_qty: newQty,
        status:status },
        { where: { id: id } }
      )
    });
    return true
  }
}

module.exports = productService;
