const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return order.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     getOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         totalPrice:
 *           type: integer
 *           example: 10000
 *         userId:
 *           type: integer
 *           example: 1
 *         status:
 *           type: boolean
 *           example: true
 *         ProductsInOrder:
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
 *     purchaseOrder:
 *       type: object
 *       properties:
 *         orderId:
 *           type: integer
 *           example: 1
 */

class order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
