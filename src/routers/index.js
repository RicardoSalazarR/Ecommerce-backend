const authRoutes = require("./auth.routes");
const cartRoutes = require("./cart.routes");
const productsRoutes = require("./products.routes");
const orderRoutes = require("./order.routes");
const authMiddleware = require("../middlewares/auth.middleware");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", productsRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/order",authMiddleware, orderRoutes);
};

module.exports = routerApi;
