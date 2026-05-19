const OrdenDetalle = require('../models/OrdenDetalle');

const getAll = async (req, res) => {
  try {
    res.json(await OrdenDetalle.findAll());
  } catch { res.status(500).json({ error: 'Error al consultar' }); }
};

const create = async (req, res) => {
  try {
    const detalle = await OrdenDetalle.create(req.body);
    res.status(201).json({ mensaje: 'Detalle creado', detalle });
  } catch { res.status(400).json({ error: 'Datos inválidos' }); }
};

// 1. AGREGÁ ESTA FUNCIÓN (Faltaba el update)
const update = async (req, res) => {
  try {
    // Nota: Como en tu ruta usás router.put('/', ...), 
    // asumimos que el id viene dentro de req.body
    const { id } = req.body; 
    const [actualizados] = await OrdenDetalle.update(req.body, { where: { id } });
    
    if (actualizados > 0) res.json({ mensaje: 'Detalle actualizado' });
    else res.status(404).json({ error: 'Detalle no encontrado' });
  } catch { res.status(500).json({ error: 'Error al actualizar' }); }
};

const remove = async (req, res) => {
  try {
    const borrados = await OrdenDetalle.destroy({ where: { id: req.params.id } });
    if (borrados > 0) res.json({ mensaje: 'Detalle eliminado' });
    else res.status(404).json({ error: 'Detalle no encontrado' });
  } catch { res.status(500).json({ error: 'Error al eliminar' }); }
};

// 2. AGREGALO ACÁ EN LOS EXPORTS
module.exports = { getAll, create, update, remove };