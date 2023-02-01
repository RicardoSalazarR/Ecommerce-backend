const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routerApi = require("./routers");
const error = require('./middlewares/error.middleware')

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

routerApi(app)

app.use(error)

module.exports = app;
