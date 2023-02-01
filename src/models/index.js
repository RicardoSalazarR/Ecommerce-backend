const db = require("../utils/database");
const initModels = require("./init-models");

const models = initModels(db);

module.exports = models;
