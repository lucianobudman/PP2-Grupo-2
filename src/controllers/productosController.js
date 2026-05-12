const { Productos } = require('../../Js/Productos.js');

const getAll = (req, res) => {
  res.json(Productos.mostrarInventario());
};

const getById = (req, res) => {
  const producto = Productos.obtenerProducto(parseInt(req.params.id));
  if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(producto);
};

const create = (req, res) => {
  const { Id_P, Precio_Unitario, Stock, Nombre, codigoBarra } = req.body;
  const nuevoProducto = new Productos(Id_P, Precio_Unitario, Stock, Nombre, codigoBarra);
  Productos.agregarProducto(nuevoProducto);
  res.status(201).json({ message: 'Producto agregado', producto: nuevoProducto });
};

const update = (req, res) => {
  const producto = Productos.actualizarProducto(parseInt(req.params.id), req.body);
  if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: 'Producto actualizado', producto });
};

const remove = (req, res) => {
  const resultado = Productos.eliminarProducto(parseInt(req.params.id));
  if (!resultado) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: resultado });
};

module.exports = { getAll, getById, create, update, remove };