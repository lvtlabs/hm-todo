const config = require("../controllers/common/configService");
const Sequelize = require("sequelize");
const connection = config.postgresProperties;
// console.log('............Postgres..............');
// console.log(connection);

const sequelize = new Sequelize({
  database: connection.database,
  username: connection.user,
  host: connection.host,
  port: connection.port,
  password: connection.password,
  dialect: "postgres",
  dialectOptions: {
    
  }
});

sequelize.sync().then(
  function () {
    console.log("DB connection sucessful.");
  },
  function (err) {
    // catch error here
    console.log("Not able to establish DB connection");
    console.log(err);
  }
);

module.exports = sequelize;
