require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/database');
const cors = require('cors');
const Category = require('./models/Category');
const Producto = require('./models/Producto');

// Asociaciones
Producto.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Importar modelos para que Sequelize los registre
require('./models/Cliente');
require('./models/Cupon');
require('./models/OrdenCompra');
require('./models/OrdenDetalle');

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Rutas
app.use('/api/productos', require('./routes/productosRoutes'));
app.use('/api/clientes', require('./routes/clientesRoutes'));
app.use('/api/cupones', require('./routes/cuponesRoutes'));
app.use('/api/ordenes', require('./routes/ordenesRoutes'));
app.use('/api/Orden_Detalle', require('./routes/ordenDetalleRoutes'));

// Ruta categorias
app.get('/api/categorias', async (req, res) => {
    const categorias = await Category.findAll();
    res.json(categorias);
});

// Sincronizar BD y arrancar servidor
sequelize.sync()
  .then(() => {
    console.log('✅ Base de datos conectada y sincronizada');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('❌ Error de conexión:', err));