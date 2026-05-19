const Cliente = require('../models/Cliente');

const getAll = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
};

const getById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const create = async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json({ mensaje: 'Cliente creado', cliente: nuevoCliente });
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }
};

const update = async (req, res) => {
  try {
    const [actualizado] = await Cliente.update(req.body, { where: { id: req.params.id } });
    if (actualizado) {
      res.json({ mensaje: 'Cliente actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

const remove = async (req, res) => {
  try {
    const borrados = await Cliente.destroy({ where: { id: req.params.id } });
    if (borrados > 0) {
      res.json({ mensaje: 'Cliente eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al intentar eliminar' });
  }
};

module.exports = { getAll, getById, create, update, remove };