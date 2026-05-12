const { Cupones } = require('../../Js/Cupones.js');

const getAll = (req, res) => {
  res.json(Cupones.mostrarCupones());
};

const getById = (req, res) => {
  const cupon = Cupones.obtenerCupon(parseInt(req.params.id));
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
  const cupon = Cupones.actualizarCupon(parseInt(req.params.id), req.body);
  if (!cupon) return res.status(404).json({ message: 'Cupón no encontrado' });
  res.json({ message: 'Cupón actualizado', cupon });
};

const remove = (req, res) => {
  const resultado = Cupones.eliminarCupon(parseInt(req.params.id));
  if (!resultado) return res.status(404).json({ message: 'Cupón no encontrado' });
  res.json({ message: resultado });
};

module.exports = { getAll, getById, create, update, remove };