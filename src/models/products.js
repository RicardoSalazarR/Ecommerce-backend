const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products.init(sequelize, DataTypes);
}


/**
 * @openapi
 * components:
 *   schemas:
 *     getProducts:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: product_name
 *         price:
 *           type: integer
 *           example: 10000
 *         availableQty:
 *           type: int
 *           example: 11
 *         status:
 *           type: boolean
 *           example: true
 *         image:
 *           type: string
 *           example: url image
 *         userId:
 *           type: integer
 *           example: 1
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: username
 *     postProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: product_name
 *         price:
 *           type: integer
 *           example: 10000
 *         availableQty:
 *           type: int
 *           example: 11
 *         image:
 *           type: string
 *           example: image url
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

class products extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "products_name_key"
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    availableQty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
