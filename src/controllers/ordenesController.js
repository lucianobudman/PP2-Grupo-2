const OrdenCompra = require('../models/OrdenCompra');
const Cliente = require('../models/Cliente');
const Cupon = require('../models/Cupon');
const Producto = require('../models/Producto');
const OrdenDetalle = require('../models/OrdenDetalle');

const getAll = async (req, res) => {
  try {
    res.json(await OrdenCompra.findAll());
  } catch { res.status(500).json({ error: 'Error al consultar' }); }
};

const getById = async (req, res) => {
  try {
    const orden = await OrdenCompra.findByPk(req.params.id);
    if (orden) res.json(orden);
    else res.status(404).json({ error: 'Orden no encontrada' });
  } catch { res.status(500).json({ error: 'Error en el servidor' }); }
};

const create = async (req, res) => {
  try {
    const orden = await OrdenCompra.create(req.body);
    res.status(201).json({ mensaje: 'Orden creada', orden });
  } catch { res.status(400).json({ error: 'Datos inválidos' }); }
};

const update = async (req, res) => {
  try {
    const [actualizado] = await OrdenCompra.update(req.body, { where: { id: req.params.id } });
    if (actualizado) res.json({ mensaje: 'Orden actualizada' });
    else res.status(404).json({ error: 'Orden no encontrada' });
  } catch { res.status(500).json({ error: 'Error al actualizar' }); }
};

const remove = async (req, res) => {
  try {
    const borrados = await OrdenCompra.destroy({ where: { id: req.params.id } });
    if (borrados > 0) res.json({ mensaje: 'Orden eliminada' });
    else res.status(404).json({ error: 'Orden no encontrada' });
  } catch { res.status(500).json({ error: 'Error al eliminar' }); }
};

const checkout = async (req, res) => {
  try {
    const { items, clienteId, cuponCode } = req.body;

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    let porcentajeDescuento = 0;
    let cuponAplicado = null;

    if (cliente.corporativo) {
      porcentajeDescuento = 10;
    } else if (cuponCode === 'TICKET5') {
      porcentajeDescuento = 5;
      cuponAplicado = cuponCode;
    }

    let subtotal = 0;
    const detalles = [];

    for (const item of items) {
      const producto = await Producto.findOne({ where: { nombre: item.nombre } });
      if (producto && producto.stock >= item.cantidad) {
        const subtotalItem = producto.precio * item.cantidad;
        subtotal += subtotalItem;
        detalles.push({ productoId: producto.id, cantidad: item.cantidad, precio_unitario: producto.precio });
        await Producto.update({ stock: producto.stock - item.cantidad }, { where: { id: producto.id } });
      }
    }

    const total = subtotal * (1 - porcentajeDescuento / 100);
    const orden = await OrdenCompra.create({ fecha: new Date(), total, estado: 'Pendiente', iva: 0, descuento: porcentajeDescuento, clienteId });

    for (const det of detalles) {
      await OrdenDetalle.create({ ...det, ordenId: orden.id });
    }

    res.json({
      mensaje: 'Orden creada',
      resumen: {
        subtotal,
        descuentoAplicado: subtotal - total,
        porcentajeDescuento,
        total,
        clienteCorporativo: cliente.corporativo,
        cuponAplicado: !!cuponAplicado,
        codigoCupon: cuponAplicado
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el checkout' });
  }
};

module.exports = { getAll, getById, create, update, remove, checkout };