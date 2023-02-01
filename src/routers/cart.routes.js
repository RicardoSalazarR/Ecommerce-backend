const Router = require("express");
const { postProduct, getCart } = require("../controllers/cart.controller");
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();


/**
 * @openapi
 * /api/v1/cart:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all the  products in the cart
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getCart'
 *       400:
 *         description: validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: add a pproduct to the cart
 *     tags: [Cart]
 *     requestBody:
 *       description: required fields to add a new product to the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addCart'
 *     responses:
 *       200:
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


router.post("/",authMiddleware, postProduct);
router.get("/",authMiddleware, getCart);

module.exports = router;
