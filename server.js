const express = require('express');
const app = express();
const PORT = 3000;

const { Clientes } = require('./Js/Clientes.js');
const { Productos } = require('./Js/Productos.js');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/productos', require('./src/routes/productosRoutes'));
app.use('/api/clientes', require('./src/routes/clientesRoutes'));
app.use('/api/cupones', require('./src/routes/cuponesRoutes'));
app.use('/api/ordenes', require('./src/routes/ordenesRoutes'));
app.use('/api/Orden_Detalle', require('./src/routes/ordenDetalleRoutes'));


Clientes.agregarCliente(new Clientes(1, 'Juan', 'Pérez', false));
Clientes.agregarCliente(new Clientes(2, 'María', 'García', true));
Clientes.agregarCliente(new Clientes(3, 'Carlos', 'López', false));

Productos.agregarProducto(new Productos(1, 85000, 10, 'Smartphone X-1', '123456'));
Productos.agregarProducto(new Productos(2, 450000, 5, 'Laptop Pro Max', '234567'));
Productos.agregarProducto(new Productos(3, 25000, 20, 'Audio Ultra G', '345678'));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});