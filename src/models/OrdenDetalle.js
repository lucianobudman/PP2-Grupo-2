const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenDetalle = sequelize.define('OrdenDetalle', {
  ordenId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = OrdenDetalle;
