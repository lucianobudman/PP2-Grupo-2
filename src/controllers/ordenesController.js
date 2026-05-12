const { Orden_Compra } = require('../../Js/Orden_Compra.js');
const { Clientes } = require('../../Js/Clientes.js');
const { Orden_Detalle } = require('../../Js/Orden_Detalle.js');
const { Productos } = require('../../Js/Productos.js');

const getAll = (req, res) => {
  res.json(Orden_Compra.mostrarOrdenes());
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const orden = Orden_Compra.obtenerOrden(id);
  if (!orden) return res.status(404).json({ message: 'Orden no encontrada' });
  res.json(orden.mostrarResumen());
};

const create = (req, res) => {
  const { idOrden, fecha, total, estado, iva, descuento, clienteId, cupon } = req.body;
  const cliente = Clientes.clientes.find(c => c.id_ci === clienteId);
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

  const nuevaOrden = new Orden_Compra(idOrden, new Date(fecha), total, estado, iva, descuento, cliente, cupon);
  Orden_Compra.agregarOrden(nuevaOrden);
  res.status(201).json({ message: 'Orden agregada', orden: nuevaOrden.mostrarResumen() });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { estado } = req.body;
  const resultado = Orden_Compra.actualizarOrden(id, { Estado: estado });

  if (resultado.includes('actualizada')) {
    res.json({ message: resultado, orden: Orden_Compra.obtenerOrden(id).mostrarResumen() });
  } else {
    res.status(404).json({ message: resultado });
  }
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const resultado = Orden_Compra.eliminarOrden(id);
  if (!resultado) return res.status(404).json({ message: 'Orden no encontrada' });
  res.json({ message: resultado });
};

const checkout = (req, res) => {
  const { items, clienteId, cuponCode } = req.body;

  const cliente = Clientes.clientes.find(c => c.id_ci === clienteId);
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

  let cupon = null;
  const ticketValido = !cliente.corporativo && cuponCode === 'TICKET5';
  if (ticketValido) {
    cupon = { cuponValido: true, codigo: cuponCode, descuento: 5 };
  }

  const ordenId = Date.now();
  const orden = new Orden_Compra(ordenId, new Date(), 0, 'Pendiente', 0, 0, cliente, cupon);

  items.forEach((item, index) => {
    const producto = Productos.inventario.find(p => p.Nombre === item.nombre);
    if (producto && producto.hayStock(item.cantidad)) {
      const detalle = new Orden_Detalle(ordenId, producto.Precio_Unitario, index + 1, producto.Id_P, item.cantidad);
      orden.agregarDetalle(detalle);
      producto.reducirStock(item.cantidad);
    }
  });

  const subtotal = orden.Detalle.reduce((acc, det) => acc + det.subtotal(), 0);
  orden.Total = orden.calcularTotal();
  const descuentoAplicado = subtotal - orden.Total;
  const porcentajeDescuento = cliente.corporativo ? 10 : (cupon ? cupon.descuento : 0);

  Orden_Compra.agregarOrden(orden);

  res.json({
    message: 'Orden creada',
    orden,
    resumen: {
      subtotal,
      descuentoAplicado,
      porcentajeDescuento,
      total: orden.Total,
      clienteCorporativo: cliente.corporativo,
      cuponAplicado: !!cupon,
      codigoCupon: cupon ? cupon.codigo : null
    }
  });
};

module.exports = { getAll, getById, create, update, remove, checkout };