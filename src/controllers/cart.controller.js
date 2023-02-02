const cartService = require("../services/cart.service");

const postProduct = async (req, res, next) => {
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;
    const { id: cartId, totalPrice } = await cartService.getDataCart(userId);
    if (cartId) {
      const result = await cartService.addProduct(
        cartId,
        productId,
        quantity,
        totalPrice
      );
      if (result) {
        if (result.error === "not enough stock") {
          next({ message: "not enough stock" });
        }
        res.status(201).json({ message: "Product added" });
      } else {
        next({ message: "something went wrong" });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const { userId:id } = req;
    const result = await cartService.getCart(id);
    if (result) {
      res.status(200).json(result);
    } else {
      next({ message: "something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postProduct,
  getCart,
};
