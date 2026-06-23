const { Op } = require('sequelize');
const Producto = require('./Producto');

const validarVigencia = async (items) => {
    const today = new Date();
    
    for (const item of items) {
        const producto = await Producto.findOne({
            where: {
                id: item.productoId,
                validFrom: { [Op.lte]: today },
                validTo: { [Op.gte]: today }
            }
        });

        if (!producto) {
            throw new Error(`El producto con ID ${item.productoId} está vencido o no existe`);
        }

        if (producto.stock < item.cantidad) {
            throw new Error(`Stock insuficiente para el producto ${producto.nombre}`);
        }
    }
};

module.exports = { validarVigencia };