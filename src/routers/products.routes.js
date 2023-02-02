const { Router } = require("express");
const {
  getProducts,
  postProduct,
} = require("../controllers/products.controller");
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: Get all products whose quantity is greater than 0
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getProducts'
 *       400:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: something went wrong
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: add a new product
 *     tags: [Products]
 *     requestBody:
 *       description: required fields to add a new products
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postProduct'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product created
 *       400:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: something went wrong
 */

router.get("/", getProducts);
router.post("/",authMiddleware, postProduct);

module.exports = router;
