const Cupon = require('../models/Cupon');

const getAll = async (req, res) => {
  try {
    res.json(await Cupon.findAll());
  } catch { res.status(500).json({ error: 'Error al consultar' }); }
};

const getById = async (req, res) => {
  try {
    const cupon = await Cupon.findByPk(req.params.id);
    if (cupon) res.json(cupon);
    else res.status(404).json({ error: 'Cupón no encontrado' });
  } catch { res.status(500).json({ error: 'Error en el servidor' }); }
};

const create = async (req, res) => {
  try {
    const cupon = await Cupon.create(req.body);
    res.status(201).json({ mensaje: 'Cupón creado', cupon });
  } catch { res.status(400).json({ error: 'Datos inválidos' }); }
};

const update = async (req, res) => {
  try {
    const [actualizado] = await Cupon.update(req.body, { where: { id: req.params.id } });
    if (actualizado) res.json({ mensaje: 'Cupón actualizado' });
    else res.status(404).json({ error: 'Cupón no encontrado' });
  } catch { res.status(500).json({ error: 'Error al actualizar' }); }
};

const remove = async (req, res) => {
  try {
    const borrados = await Cupon.destroy({ where: { id: req.params.id } });
    if (borrados > 0) res.json({ mensaje: 'Cupón eliminado' });
    else res.status(404).json({ error: 'Cupón no encontrado' });
  } catch { res.status(500).json({ error: 'Error al eliminar' }); }
};

module.exports = { getAll, getById, create, update, remove };