const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: [
    "./src/routers/auth.routes.js",
    "./src/models/users.js",
    "./src/routers/products.routes.js",
    "./src/models/products.js",
    "./src/routers/cart.routes.js",
    "./src/models/cart.js",
    "./src/routers/order.routes.js",
    "./src/models/order.js",
  ],
  definition: {
    openapi: "3.0.0",
    Innfo: {
      title: "ecommerce",
      version: "0.0.9",
      description: "API para ecommerce",
    },
  },
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader({ "Content-Type": "aplication/json" });
    res.send(swaggerSpec);
  });
  console.log(
    `La documentacion esta disponible en ${process.env.URL}:${port}/api/v1/docs`
  );
};

module.exports = swaggerDocs;
