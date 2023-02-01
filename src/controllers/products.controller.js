const productsService = require("../services/products.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const getProducts = async (req, res) => {
  try {
    result = await productsService.get();
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

const postProduct = async (req, res) => {
  try {
    const product = req.body;
    product.userId = req.userId;

    const result = await productsService.create(product);
    if (result) {
      res.status(201).json("Product created");
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};


module.exports = {
  getProducts,
  postProduct,
};
