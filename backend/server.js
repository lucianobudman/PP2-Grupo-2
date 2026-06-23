require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Importar modelos para que Sequelize los registre
require('./models/Producto');
require('./models/Cliente');
require('./models/Cupon');
require('./models/OrdenCompra');
require('./models/OrdenDetalle');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'admin.html'));
});

// Rutas
app.use('/api/productos', require('./routes/productosRoutes'));
app.use('/api/clientes', require('./routes/clientesRoutes'));
app.use('/api/cupones', require('./routes/cuponesRoutes'));
app.use('/api/ordenes', require('./routes/ordenesRoutes'));
app.use('/api/Orden_Detalle', require('./routes/ordenDetalleRoutes'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

sequelize.sync()
  .then(() => {
    console.log('✅ Base de datos conectada y sincronizada');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error de conexión:', err);
    process.exit(1);
  });