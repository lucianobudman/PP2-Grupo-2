const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenCompra = sequelize.define('OrdenCompra', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Pendiente'
  },
  iva: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  descuento: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cuponId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = OrdenCompra;
