require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('./src/config/database');

// Importar modelos para que Sequelize los registre
require('./src/models/Producto');
require('./src/models/Cliente');
require('./src/models/Cupon');
require('./src/models/OrdenCompra');
require('./src/models/OrdenDetalle');

app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/api/productos', require('./src/routes/productosRoutes'));
app.use('/api/clientes', require('./src/routes/clientesRoutes'));
app.use('/api/cupones', require('./src/routes/cuponesRoutes'));
app.use('/api/ordenes', require('./src/routes/ordenesRoutes'));
app.use('/api/Orden_Detalle', require('./src/routes/ordenDetalleRoutes'));

// Sincronizar BD y arrancar servidor
sequelize.sync()
  .then(() => {
    console.log('✅ Base de datos conectada y sincronizada');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('❌ Error de conexión:', err));