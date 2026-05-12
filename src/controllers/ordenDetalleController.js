const { Orden_Detalle } = require('../../Js/Orden_Detalle.js');

const create = (req, res) => {
  const { registros } = req.body;
  const objetos = Orden_Detalle.CambiarRegistros(registros);
  const respuesta = Orden_Detalle.mostrarDetallesPorOrden(objetos);
  res.status(201).json({ mensaje: 'Alta exitosa', resultado: respuesta });
};

const update = (req, res) => {
  const { registros } = req.body;
  const objetos = Orden_Detalle.CambiarRegistros(registros);
  const resultado = Orden_Detalle.mostrarDetallesPorOrden(objetos);
  res.status(200).json({ mensaje: 'Registros procesados con éxito', datos: resultado });
};

const remove = (req, res) => {
  const id = req.params.id;
  if (Orden_Detalle.borrar(id)) {
    return res.status(200).json({ mensaje: `Registro ${id} eliminado correctamente` });
  }
  return res.status(404).json({ mensaje: `Registro ${id} no encontrado` });
};

module.exports = { create, update, remove };