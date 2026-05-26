//El Modelo es el "molde" de nuestra tabla. Reemplaza a las clases JS que hicimos en la Clase 3. 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importamos la conexión 
// Definimos la tabla 'Productos' 
const Producto = sequelize.define('Producto', {
    // El ID se crea solo por defecto (Autoincremental), no hace falta ponerlo 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false // Obligatorio 
    },
    precio: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});
module.exports = Producto;