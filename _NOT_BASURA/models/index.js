const sequelize = require('../config/database');
const Producto = require('./Producto');
const Category = require('./Category');
const Cliente = require('./Cliente');
const Cupon = require('./Cupon');
const OrdenCompra = require('./OrdenCompra');
const OrdenDetalle = require('./OrdenDetalle');

// Asociaciones
Category.hasMany(Producto, { foreignKey: 'categoryId', as: 'productos' });
Producto.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

OrdenCompra.hasMany(OrdenDetalle, { foreignKey: 'ordenId', as: 'detalles' });
OrdenDetalle.belongsTo(OrdenCompra, { foreignKey: 'ordenId' });

OrdenDetalle.belongsTo(Producto, { foreignKey: 'productoId' });
Producto.hasMany(OrdenDetalle, { foreignKey: 'productoId' });

module.exports = { sequelize, Producto, Category, Cliente, Cupon, OrdenCompra, OrdenDetalle };