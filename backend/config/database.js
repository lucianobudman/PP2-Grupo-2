const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || path.join(__dirname, '..', 'ecommerce.sqlite'),
  logging: false
});

module.exports = sequelize;