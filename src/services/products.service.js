const models = require("../models");
const { Op } = require("@sequelize/core");
const { products, users } = models;

class productService {
  static async get() {
    try {
      const result = await products.findAll({
        where: {
          availableQty: {
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
