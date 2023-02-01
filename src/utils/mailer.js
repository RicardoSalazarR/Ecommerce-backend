//import nodemailer
const nodemailer = require("nodemailer");
//contraseña de aplicacion
require("dotenv").config();

//crear  transportador
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "465",
  secure: true,
  auth: {
    user: "axel.111yo@gmail.com",
    pass: process.env.G_PASSWORD,
  },
});

module.exports = transporter;