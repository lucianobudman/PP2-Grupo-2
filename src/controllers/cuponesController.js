const { Cupones } = require('../../Js/Cupones.js');

const getAll = (req, res) => {
  res.json(Cupones.mostrarCupones());
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const cupon = Cupones.cupones.find(c => c.id_Cu === id);
  if (!cupon) return res.status(404).json({ message: 'Cupón no encontrado' });
  res.json(cupon);
};

const create = (req, res) => {
  const { id_Cu, fecha_validez, codigo } = req.body;
  const nuevoCupon = new Cupones(id_Cu, fecha_validez, codigo);
  Cupones.agregarCupon(nuevoCupon);
  res.status(201).json({ message: 'Cupón agregado', cupon: nuevoCupon });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const cupon = Cupones.cupones.find(c => c.id_Cu === id);
  if (!cupon) return res.status(404).json({ message: 'Cupón no encontrado' });

  const { fecha_validez, codigo } = req.body;
  if (fecha_validez !== undefined) cupon.fecha_validez = new Date(fecha_validez);
  if (codigo !== undefined) cupon.codigo = codigo;

  res.json({ message: 'Cupón actualizado', cupon });
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = Cupones.cupones.findIndex(c => c.id_Cu === id);
  if (index === -1) return res.status(404).json({ message: 'Cupón no encontrado' });

  Cupones.cupones.splice(index, 1);
  res.json({ message: 'Cupón eliminado' });
};

module.exports = { getAll, getById, create, update, remove };