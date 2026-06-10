require('dotenv').config();
const sequelize = require('./config/database');
const Producto = require('./models/Producto');
const Cliente = require('./models/Cliente');
const Cupon = require('./models/Cupon');
const Category = require('./models/Category');

async function seed() {
  await sequelize.sync({ force: true });

  const categorias = await Category.bulkCreate([
    { nombre: 'Smartphones' },
    { nombre: 'Laptops' },
    { nombre: 'Audio' },
    { nombre: 'Monitores' }
  ]);

  await Producto.bulkCreate([
    { nombre: 'Smartphone X-1', precio: 85000, stock: 10, categoryId: categorias[0].id, validFrom: new Date(), validTo: new Date('2099-12-31') },
    { nombre: 'Laptop Pro Max', precio: 450000, stock: 5, categoryId: categorias[1].id, validFrom: new Date(), validTo: new Date('2099-12-31') },
    { nombre: 'Audio Ultra G', precio: 25000, stock: 20, categoryId: categorias[2].id, validFrom: new Date(), validTo: new Date('2099-12-31') },
    { nombre: 'Monitor 4K Ultra', precio: 320000, stock: 0, categoryId: categorias[3].id, validFrom: new Date(), validTo: new Date('2099-12-31') }
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