// Simulación de Base de Datos Temporal 
let lista = [{ id: 1, nombre: "Monitor", precio: 150000 }];
const productosController = {
	getAll: (req, res) => {
		res.json(lista);
	},
	getById: (req, res) => {
		const idBuscado = req.params.id; // Capturamos el :id de la URL 
		const encontrado = lista.find(p => p.id == idBuscado);
		encontrado ? res.json(encontrado) : res.status(404).json({ error: "No encontrado" });
	},

	create: (req, res) => {
		const nuevo = req.body;
		lista.push(nuevo);
		res.status(201).json({ mensaje: "Creado con éxito", producto: nuevo });
	},

	update: (req, res) => {
		// Lógica para actualizar... 
		res.json({ mensaje: "Actualizado con éxito" });
	},

	remove: (req, res) => {
		// Lógica para eliminar... 
		res.json({ mensaje: "Eliminado con éxito" });
	}
};

module.exports = productosController;