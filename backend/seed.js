require('dotenv').config();
const sequelize = require('./config/database');
const Producto = require('./models/Producto');
const Cliente = require('./models/Cliente');
const Cupon = require('./models/Cupon');
const Category = require('./models/Category');

async function seed() {
  try {
    // 1. Desactivamos temporalmente el control de claves foráneas en SQLite
    await sequelize.query('PRAGMA foreign_keys = OFF;');

    // Sincronizamos la base de datos (va a tirar el DROP de tablas sin chillar)
    await sequelize.sync({ force: true });
    console.log('🔄 Tablas limpiadas correctamente');

    const categorias = await Category.bulkCreate([
      { nombre: 'Smartphones' },
      { nombre: 'Laptops' },
      { nombre: 'Audio' },
      { nombre: 'Monitores' }
    ]);

    await Producto.bulkCreate([
      {
        nombre: 'Smartphone X-1',
        precio: 85000,
        stock: 10,
        categoryId: categorias[0].id,
        imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        validFrom: new Date(),
        validTo: new Date('2099-12-31')
      },
      // Buscá esta línea dentro de Producto.bulkCreate y reemplazá la URL de la laptop:
      {
        nombre: 'Laptop Pro Max',
        precio: 450000,
        stock: 5,
        categoryId: categorias[1].id,
        imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', // 👈 Nueva URL fija
        validFrom: new Date(),
        validTo: new Date('2099-12-31')
      },
      {
        nombre: 'Audio Ultra G',
        precio: 25000,
        stock: 20,
        categoryId: categorias[2].id,
        imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        validFrom: new Date(),
        validTo: new Date('2099-12-31')
      },
      {
        nombre: 'Monitor 4K Ultra',
        precio: 320000,
        stock: 0,
        categoryId: categorias[3].id,
        imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        validFrom: new Date(),
        validTo: new Date('2099-12-31')
      }
    ]);

    await Cliente.bulkCreate([
      { nombre: 'Juan', apellido: 'Pérez', corporativo: false },
      { nombre: 'María', apellido: 'García', corporativo: true },
      { nombre: 'Carlos', apellido: 'López', corporativo: false }
    ]);

    await Cupon.bulkCreate([
      { codigo: 'TICKET5', fecha_validez: '2027-12-31' }
    ]);

    // 2. Volvemos a activar el control de claves foráneas por seguridad
    await sequelize.query('PRAGMA foreign_keys = ON;');

    console.log('✅ Base de datos poblada correctamente');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

seed().catch(err => {
  console.error('❌ Error al poblar la base de datos:', err);
  process.exit(1);
});