const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.use('/api/productos', require('./src/routes/productosRoutes'));
app.use('/api/clientes', require('./src/routes/clientesRoutes'));
app.use('/api/cupones', require('./src/routes/cuponesRoutes'));
app.use('/api/ordenes', require('./src/routes/ordenesRoutes'));
app.use('/api/Orden_Detalle', require('./src/routes/ordenDetalleRoutes'));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});