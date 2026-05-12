const { Productos } = require('../../Js/Productos.js');

const getAll = (req, res) => {
  res.json(Productos.mostrarInventario());
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const producto = Productos.inventario.find(p => p.Id_P === id);
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
  const id = parseInt(req.params.id);
  const producto = Productos.inventario.find(p => p.Id_P === id);
  if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

  const { Precio_Unitario, Stock, Nombre, codigoBarra } = req.body;
  if (Precio_Unitario !== undefined) producto.Precio_Unitario = Precio_Unitario;
  if (Stock !== undefined) producto.Stock = Stock;
  if (Nombre !== undefined) producto.Nombre = Nombre;
  if (codigoBarra !== undefined) producto.codigoBarra = codigoBarra;

  res.json({ message: 'Producto actualizado', producto });
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = Productos.inventario.findIndex(p => p.Id_P === id);
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });

  Productos.inventario.splice(index, 1);
  res.json({ message: 'Producto eliminado' });
};

module.exports = { getAll, getById, create, update, remove };