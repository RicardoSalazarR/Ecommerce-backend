const DataTypes = require("sequelize").DataTypes;
const _cart = require("./cart");
const _order = require("./order");
const _productInCart = require("./productInCart");
const _productInOrder = require("./productInOrder");
const _products = require("./products");
const _users = require("./users");

function initModels(sequelize) {
  const cart = _cart(sequelize, DataTypes);
  const order = _order(sequelize, DataTypes);
  const productInCart = _productInCart(sequelize, DataTypes);
  const productInOrder = _productInOrder(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  productInCart.belongsTo(cart, { as: "cart", foreignKey: "cartId"});
  cart.hasMany(productInCart, { as: "productInCarts", foreignKey: "cartId"});
  productInOrder.belongsTo(order, { as: "order", foreignKey: "orderId"});
  order.hasMany(productInOrder, { as: "productsInOrder", foreignKey: "orderId"});
  productInCart.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(productInCart, { as: "productInCarts", foreignKey: "productId"});
  productInOrder.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(productInOrder, { as: "productsInOrders", foreignKey: "productId"});
  cart.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(cart, { as: "carts", foreignKey: "userId"});
  order.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(order, { as: "orders", foreignKey: "userId"});
  products.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(products, { as: "products", foreignKey: "userId"});

  return {
    cart,
    order,
    productInCart,
    productInOrder,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
