require('dotenv').config();
const sequelize = require('./config/database');
const Producto = require('./models/Producto');
const Cliente = require('./models/Cliente');
const Cupon = require('./models/Cupon');

async function seed() {
  await sequelize.sync({ force: true });

  await Producto.bulkCreate([
    { nombre: 'Smartphone X-1', precio: 85000, stock: 10 },
    { nombre: 'Laptop Pro Max', precio: 450000, stock: 5 },
    { nombre: 'Audio Ultra G', precio: 25000, stock: 20 },
    { nombre: 'Monitor 27" 4K', precio: 180000, stock: 8 },
    { nombre: 'Teclado Mecánico RGB', precio: 42000, stock: 15 }
  ]);

  await Cliente.bulkCreate([
    { nombre: 'Juan', apellido: 'Pérez', corporativo: false, isAdmin: true },
    { nombre: 'María', apellido: 'García', corporativo: true, isAdmin: false },
    { nombre: 'Carlos', apellido: 'López', corporativo: false, isAdmin: false }
  ]);

  await Cupon.bulkCreate([
    { codigo: 'TICKET5', fecha_validez: '2027-12-31' },
    { codigo: 'WELCOME10', fecha_validez: '2027-12-31' }
  ]);

  console.log('✅ Base de datos poblada correctamente');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error al poblar la base de datos:', err);
  process.exit(1);
});