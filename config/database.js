const Sequelize = require("sequelize");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  module.exports = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  module.exports = new Sequelize({
    database: process.env.MYSQL_DB,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}
