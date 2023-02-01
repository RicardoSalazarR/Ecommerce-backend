const { cart } = require("../models");
const models = require("../models");

class cartService {
  static async createCart(userId) {
    try {
      const result = models.cart.create({ userId, totalPrice: 0 });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getDataCart(userId) {
    try {
      const result = await models.cart.findOne({ where: { userId } });
      return result.dataValues;
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(cartId, productId, quantity, totalPrice) {
    const product = await models.products.findOne({
      where: { id: productId },
    });
    const data = {
      cartId,
      productId,
      quantity,
      price: product.dataValues.price,
      status: product.dataValues.status,
    };
    if (product.dataValues.availableQty >= data.quantity) {
      const added = await models.productInCart.create(data);
      if (added) {
        totalPrice += data.quantity * data.price;
        const update = await models.cart.update(
          { totalPrice: totalPrice },
          { where: { id: cartId } }
        );
        return update;
      }
    } else {
      return { error: "not enough stock" };
    }
  }

  static async getCart(id) {
    try {
      const result = await models.cart.findOne({
        where: { userId: id },
        include: {
          model: models.productInCart,
          as: "productInCarts",
          attributes: ["productId", "quantity", "price", "status"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async emptyCart(cartId) {
    try {
      const result = await models.productInCart.destroy({
        where: { cartId },
      });
      await models.cart.update(
        { totalPrice: 0 },
        {
          where: { id: cartId },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = cartService;
