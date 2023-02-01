const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: ricardoSalazar
 *         email:
 *           type: string
 *           example: axel.111yo@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: axel.111yo@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     loginresponse:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           example: Ricardo
 *         lastname:
 *           type: string
 *           example: Salazar
 *         usernme:
 *           type: string
 *           example: ricardosalazar
 *         id:
 *           type: int
 *           example: 1
 *         email:
 *           type: string
 *           example: axel.111yo@gmail.com
 *         token:
 *           type: string
 *           example: $2b$10$WQYwFuxT2QrXG.isGEe38ObrzS9dNHRm1ClOQB8RHvvBnqQv1Gp3a
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

class users extends Sequelize.Model {
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
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: "users_email_key",
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeCreate: (user, options) => {
            const { password } = user;
            const hash = bcrypt.hashSync(password, 10);
            user.password = hash;
          },
        },
        sequelize,
        tableName: "users",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "users_email_key",
            unique: true,
            fields: [{ name: "email" }],
          },
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
