const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/productosController');


// El Router asocia el Verbo HTTP + la URL con la función del Controlador. 
router.get('/', controller.getAll);// GET -> Colección completa 
router.get('/:id', controller.getById);// GET -> Un elemento por ID 
router.post('/', controller.create);// POST -> Crear nuevo 
router.put('/:id', controller.update);// PUT -> Modificar existente 
router.delete('/:id', controller.remove);// DELETE -> Eliminar 
module.exports = router;