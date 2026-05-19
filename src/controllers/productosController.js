const Producto = require('../models/Producto'); // Importamos el molde de la BD 
const productosController = {

getAll: async (req, res) => { 
        try { 
            const productos = await Producto.findAll(); // SELECT * FROM Productos 
            res.json(productos); 
        } catch (error) { 
            res.status(500).json({ error: "Error al consultar la base de datos" }); 
        } 
    }, 
 
    getById: async (req, res) => { 
        try { 
            const producto = await Producto.findByPk(req.params.id); // Buscar por Primary Key (ID) 
            if (producto) { 
                res.json(producto); 
            } else { 
                res.status(404).json({ error: "Producto no encontrado" }); 
            } 
        } catch (error) { 
            res.status(500).json({ error: "Error en el servidor" }); 
        } 
    }, 
 
    create: async (req, res) => { 
        try { 
            const nuevoProducto = await Producto.create(req.body); // INSERT INTO... 
            res.status(201).json({ mensaje: "Creado con éxito", producto: nuevoProducto }); 
        } catch (error) { 
            res.status(400).json({ error: "Datos inválidos o incompletos" }); 
        } 
    }, 
 
    update: async (req, res) => { 
        try { 
            // Buscamos y actualizamos en base al ID que viene en la URL (req.params.id) 
            const [actualizado] = await Producto.update(req.body, { where: { id: req.params.id } }); 
            if (actualizado) { 
                res.json({ mensaje: "Producto actualizado correctamente" }); 
            } else {
              res.status(404).json({ error: "No se encontró el producto a actualizar" }); 
            } 
        } catch (error) { 
            res.status(500).json({ error: "Error al actualizar" }); 
        } 
    }, 
 
    delete: async (req, res) => { 
        try { 
            const borrados = await Producto.destroy({ where: { id: req.params.id } }); 
            if (borrados > 0) { 
                res.json({ mensaje: "Producto eliminado correctamente" }); 
            } else { 
                res.status(404).json({ error: "El producto no existe" }); 
            } 
        } catch (error) { 
            res.status(500).json({ error: "Error al intentar eliminar" }); 
        } 
    } 
}; 
 
module.exports = productosController; 
