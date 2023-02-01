const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  let { authorization: token } = req.headers;
  token = token?.replace("Bearer ", "");
  if (token) {
    req.token = token;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: "HS512" },
      (err, decoded) => {
        if (err) {
          res.status(400).json({
            error: "El token no es valido o ya expiro, envia un token correcto",
          });
        } else {
          req.userId = decoded.id
          req.userEmail = decoded.email
          next();
        }
      }
    );
  } else {
    res.status(400).json({
      error: "No token provided",
      message: "No se esta eviando un token de validacion",
    });
  }
};

module.exports = authMiddleware;
//Validar el token
//Si eltoken es valido lo dejamos pasar
//si no es valido, no pasa
