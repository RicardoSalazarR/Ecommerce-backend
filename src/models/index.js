const db = require("../utils/database");
const initModels = require("./init-models");

const models = initModels(db);

const { cart, order, products, products_in_cart, products_in_order, users } =
  models;

module.exports = {
  cart,
  order,
  products,
  products_in_cart,
  products_in_order,
  users,
};
