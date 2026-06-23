require('dotenv').config();
const sequelize = require('./config/database');
const Producto = require('./models/Producto');
const Cliente = require('./models/Cliente');
const Cupon = require('./models/Cupon');

async function seed() {
  await sequelize.sync({ force: true }); // Borra y recrea las tablas

  await Producto.bulkCreate([
    { nombre: 'Smartphone X-1', precio: 85000, stock: 10 },
    { nombre: 'Laptop Pro Max', precio: 450000, stock: 5 },
    { nombre: 'Audio Ultra G', precio: 25000, stock: 20 }
  ]);

  await Cliente.bulkCreate([
    { nombre: 'Juan', apellido: 'Pérez', corporativo: false },
    { nombre: 'María', apellido: 'García', corporativo: true },
    { nombre: 'Carlos', apellido: 'López', corporativo: false }
  ]);

  await Cupon.bulkCreate([
    { codigo: 'TICKET5', fecha_validez: '2027-12-31' }
  ]);

  console.log('✅ Base de datos poblada correctamente');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error al poblar la base de datos:', err);
  process.exit(1);
});