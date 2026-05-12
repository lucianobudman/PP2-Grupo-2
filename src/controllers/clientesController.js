const { Clientes } = require('../../Js/Clientes.js');

const getAll = (req, res) => {
  res.json(Clientes.mostrarClientes());
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = Clientes.clientes.find(c => c.id_ci === id);
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
  const id = parseInt(req.params.id);
  const cliente = Clientes.clientes.find(c => c.id_ci === id);
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

  const { nombre, apellido, corporativo } = req.body;
  if (nombre !== undefined) cliente.nombre = nombre;
  if (apellido !== undefined) cliente.apellido = apellido;
  if (corporativo !== undefined) cliente.corporativo = corporativo;

  res.json({ message: 'Cliente actualizado', cliente });
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = Clientes.clientes.findIndex(c => c.id_ci === id);
  if (index === -1) return res.status(404).json({ message: 'Cliente no encontrado' });

  Clientes.clientes.splice(index, 1);
  res.json({ message: 'Cliente eliminado' });
};

module.exports = { getAll, getById, create, update, remove };