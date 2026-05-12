const { Clientes } = require('../../Js/Clientes.js');

const getAll = (req, res) => {
  res.json(Clientes.mostrarClientes());
};

const getById = (req, res) => {
  const cliente = Clientes.obtenerCliente(parseInt(req.params.id));
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(cliente);
};

const create = (req, res) => {
  const { id_ci, nombre, apellido, corporativo } = req.body;
  const nuevoCliente = new Clientes(id_ci, nombre, apellido, corporativo);
  Clientes.agregarCliente(nuevoCliente);
  res.status(201).json({ message: 'Cliente agregado', cliente: nuevoCliente });
};

const update = (req, res) => {
  const cliente = Clientes.actualizarCliente(parseInt(req.params.id), req.body);
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json({ message: 'Cliente actualizado', cliente });
};

const remove = (req, res) => {
  const resultado = Clientes.eliminarCliente(parseInt(req.params.id));
  if (!resultado) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json({ message: resultado });
};

module.exports = { getAll, getById, create, update, remove };