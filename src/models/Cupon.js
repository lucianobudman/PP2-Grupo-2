const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cupon = sequelize.define('Cupon', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_validez: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Cupon;
