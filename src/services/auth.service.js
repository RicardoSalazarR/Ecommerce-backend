const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { users } = models;

class AuthServices {
  static async register(user) {
    try {
      const result = await users.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async login(credentials) {
    try {
      const { email, password } = credentials;
      const user = await users.findOne({ where: { email } });
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);
        return isValid ? { isValid, user } : { isValid, error: "password" };
      }
      return { isValid: false, error: "emmail" };
    } catch (error) {
      throw error;
    }
  }
  static genToken(data) {
    try {
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1h",
        algorithm: "HS512",
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;

// const jwt = require("jsonwebtoken");
// const authMiddleware = (req, res, next) => {
//   let { authorization: token } = req.headers;
//   token = token.replace("Bearer ", "");
//   console.log(token);
  
// };
// module.exports = authMiddleware;
