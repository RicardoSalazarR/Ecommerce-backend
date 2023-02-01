const cartService = require("../services/cart.service");
const orderService = require("../services/order.service");
const transporter = require("../utils/mailer");

const postOrder = async (req, res, next) => {
  try {
    const { userId } = req;
    const {
      productInCarts,
      id: cartId,
      totalPrice,
    } = await cartService.getCart(userId);
    const products = [];
    const dataCart = { userId, totalPrice };
    if (productInCarts.length > 0) {
      const order = await orderService.buyCart(dataCart);
      productInCarts.forEach((product) => {
        product.dataValues.orderId = order.dataValues.id;
        products.push(product.dataValues);
      });
      const allGood = orderService.addProductInOrder(products);
      if (allGood) {
        const empty = await cartService.emptyCart(cartId);
        res.status(200).json({ message: "Cart buyed successfull" });
      } else {
        next({ message: "nothing is good" });
      }
    } else {
      next({ message: "There aren´t any products in the cart" });
    }
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { userId } = req;
    const orders = await orderService.getOrders(userId);
    if (orders) {
      res.status(200).json(orders);
    } else {
      next({ message: "try later" });
    }
  } catch (error) {
    next(error);
  }
};

const purchaseOrder = async (req, res, next) => {
  try {

    const {orderId} = req.body
    const result = await orderService.purchase(orderId)
    console.log(result);
    if(result){
      await transporter.sendMail({
        from: "axel.111yo@gmail.com",
        to: req.userEmail,
        subject: "Purchased",
        html: "<h1>Order purchased</h1> <p>order purchased succesfull</p>",
      });
      res.status(200).json({message:'Order buyed succesful'})
    }else{
      next({message:'something went wrong'})
    }


  } catch (error) {
    next(error);
  }
};

module.exports = {
  postOrder,
  getOrders,
  purchaseOrder
};