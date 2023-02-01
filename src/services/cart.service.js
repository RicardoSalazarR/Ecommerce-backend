const {
  cart,
  products_in_cart: productsInCart,
  products,
} = require("../models");

class cartService {
  static async createCart(userId) {
    try {
      const result = cart.create({ user_id: userId, totalPrice: 0 });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getDataCart(userId) {
    try {
      const result = await cart.findOne({ where: { user_id: userId } });
      return result.dataValues;
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(cartId, productId, quantity, totalPrice) {
    const product = await products.findOne({
      where: { id: productId },
    });
    const data = {
      cart_id: cartId,
      product_id: productId,
      quantity,
      price: product.dataValues.price,
    };
    if (product.dataValues.available_qty >= data.quantity) {
      const added = await productsInCart.create(data);
      if (added) {
        totalPrice += data.quantity * data.price;
        const update = await cart.update(
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
      const result = await cart.findOne({
        where: { user_id: id },
        include: {
          model: productsInCart,
          as: "productsInCart",
          attributes: ["product_id", "quantity", "price"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async emptyCart(cartId) {
    try {
      const result = await productsInCart.destroy({
        where: { cart_id: cartId },
      });
      await cart.update(
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
