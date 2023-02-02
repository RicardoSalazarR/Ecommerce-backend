const Router = require("express");
const {
  postOrder,
  getOrders,
  purchaseOrder,
} = require("../controllers/order.controller");

const router = Router();
/**
 * @openapi
 * /api/v1/order:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: see all the orders of a user
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getOrder'
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
 *     summary: move all the products in the cart to a new order
 *     tags: [Order]
 *     responses:
 *       201:
 *         description: order created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order created
 *       400:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: There aren´t products in the cart
 * /api/v1/order/purchase:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: purchase an order
 *     tags: [Order]
 *     requestBody:
 *       description: required fields to purchase an order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/purchaseOrder'
 *     responses:
 *       201:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Your order was successfully purchased
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

router.post("/", postOrder);
router.get("/", getOrders);
router.put("/purchase", purchaseOrder);

module.exports = router;
