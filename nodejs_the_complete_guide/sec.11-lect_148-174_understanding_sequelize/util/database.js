const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','node-course-student','nodeStudent.',{
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;
