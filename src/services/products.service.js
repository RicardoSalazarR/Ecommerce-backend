const {products,users} = require("../models");
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
}

module.exports = productService;
