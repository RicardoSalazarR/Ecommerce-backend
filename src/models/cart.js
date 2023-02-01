const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return cart.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schemas:
 *     getCart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         totalPrice:
 *           type: integer
 *           example: 10000
 *         ProductsInCart:
 *           type: object
 *           properties:
 *             productId:
 *               type: integer
 *               example: 1
 *             quantity:
 *               type: integer
 *               example: 1
 *             price:
 *               type: integer
 *               example: 10000
 *             status:
 *               type: boolean
 *               example: true
 *     addCart:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 1
 */

class cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        totalPrice: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "cart",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "cart_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
