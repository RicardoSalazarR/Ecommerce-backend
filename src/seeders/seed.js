const db = require("../utils/database");
const models = require("../models");

// - User (id, username, email, password)
// - Product (id, name, price, availableQty, status, userId)
// - Cart (id, userId, totalPrice)
// - ProductInCart (id, cartId, productId, quantity, price, status)
// - Order (id, totalPrice, userId, status) // si completada pendiente
// - ProductInOrder (id, orderId, productId, quantity, price, status)

const Users = [
  { username: "Ricardo2", email: "axel2.111yo@gmail.com", password: "1234" },
];
const Products = [
  {
    name: "smartphone",
    price: 10000,
    availableQty: 12,
    userId: 1,
    image: "this is an url",
  },
];

// const categories = []
// const todosCategories = []

db.sync({ force: false })
  .then(() => {
    console.log("Iniciando el sembrado malicioso");
    Products.forEach((product) => models.products.create(product));
  })
  .catch((error) => console.log(error));
