// server.js - El motor de nuestra aplicación
const express = require('express'); 
const app = express(); 
const PORT = 3000; 

// Middleware para parsear JSON
app.use(express.json());

// Le decimos al servidor que exponga públicamente los archivos de la carpeta "public" 
app.use(express.static('public')); 

// Importar clases
const { Productos } = require('./Js/Productos.js');
const { Orden_Compra } = require('./Js/Orden_Compra.js');
const { Orden_Detalle } = require('./Js/Orden_Detalle.js');
const { Clientes } = require('./Js/Clientes.js');

// Inicializar algunos productos de ejemplo
Productos.agregarProducto(new Productos(1, 85000, 10, 'Smartphone X-1', '123456'));
Productos.agregarProducto(new Productos(2, 450000, 5, 'Laptop Pro Max', '234567'));
Productos.agregarProducto(new Productos(3, 25000, 20, 'Audio Ultra G', '345678'));

// Inicializar algunos clientes de ejemplo
Clientes.agregarCliente(new Clientes(1, 'Juan', 'Pérez', false));
Clientes.agregarCliente(new Clientes(2, 'María', 'García', true));
Clientes.agregarCliente(new Clientes(3, 'Carlos', 'López', false));

// Rutas para Productos
app.get('/api/productos', (req, res) => {
  res.json(Productos.mostrarInventario());
});

app.post('/api/productos', (req, res) => {
  const { Id_P, Precio_Unitario, Stock, Nombre, codigoBarra } = req.body;
  const nuevoProducto = new Productos(Id_P, Precio_Unitario, Stock, Nombre, codigoBarra);
  Productos.agregarProducto(nuevoProducto);
  res.status(201).json({ message: 'Producto agregado', producto: nuevoProducto });
});

app.put('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = Productos.inventario.find(p => p.Id_P === id);
  if (!producto) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  const { Precio_Unitario, Stock, Nombre, codigoBarra } = req.body;
  producto.Precio_Unitario = Precio_Unitario || producto.Precio_Unitario;
  producto.Stock = Stock || producto.Stock;
  producto.Nombre = Nombre || producto.Nombre;
  producto.codigoBarra = codigoBarra || producto.codigoBarra;
  res.json({ message: 'Producto actualizado', producto });
});

app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = Productos.inventario.findIndex(p => p.Id_P === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  Productos.inventario.splice(index, 1);
  res.json({ message: 'Producto eliminado' });
});

// Rutas para Clientes
app.get('/api/clientes', (req, res) => {
  res.json(Clientes.mostrarClientes());
});

app.post('/api/clientes', (req, res) => {
  const { id_ci, nombre, apellido, corporativo } = req.body;
  const nuevoCliente = new Clientes(id_ci, nombre, apellido, corporativo);
  Clientes.agregarCliente(nuevoCliente);
  res.status(201).json({ message: 'Cliente agregado', cliente: nuevoCliente });
});

app.put('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = Clientes.clientes.find(c => c.id_ci === id);
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente no encontrado' });
  }
  const { nombre, apellido, corporativo } = req.body;
  cliente.nombre = nombre || cliente.nombre;
  cliente.apellido = apellido || cliente.apellido;
  cliente.corporativo = corporativo !== undefined ? corporativo : cliente.corporativo;
  res.json({ message: 'Cliente actualizado', cliente });
});

app.delete('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = Clientes.clientes.findIndex(c => c.id_ci === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Cliente no encontrado' });
  }
  Clientes.clientes.splice(index, 1);
  res.json({ message: 'Cliente eliminado' });
});

// Ruta para checkout
app.post('/api/checkout', (req, res) => {
  const { items, clienteId, cuponCode } = req.body;
  
  // Buscar el cliente por ID
  const cliente = Clientes.clientes.find(c => c.id_ci === clienteId);
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente no encontrado' });
  }
  
  // Validar cupón para clientes no corporativos
  let cupon = null;
  const ticketValido = !cliente.corporativo && cuponCode === 'TICKET5';
  if (ticketValido) {
    cupon = { cuponValido: true, codigo: cuponCode, descuento: 5 };
  }
  
  // Crear orden de compra
  const ordenId = Date.now();
  const orden = new Orden_Compra(ordenId, new Date(), 0, 'Pendiente', 0, 0, cliente, cupon);
  
  // Agregar detalles
  items.forEach((item, index) => {
    const producto = Productos.inventario.find(p => p.Nombre === item.nombre);
    if (producto && producto.hayStock(item.cantidad)) {
      const detalle = new Orden_Detalle(ordenId, producto.Precio_Unitario, index + 1, producto.Id_P, item.cantidad);
      orden.agregarDetalle(detalle);
      producto.reducirStock(item.cantidad);
    }
  });
  
  // Calcular subtotal antes del descuento
  const subtotal = orden.Detalle.reduce((acc, det) => acc + det.subtotal(), 0);
  
  // Calcular total con descuento
  orden.Total = orden.calcularTotal();
  
  // Calcular descuento aplicado
  const descuentoAplicado = subtotal - orden.Total;
  const porcentajeDescuento = cliente.corporativo ? 10 : (cupon ? cupon.descuento : 0);
  
  res.json({ 
    message: 'Orden creada',
    orden,
    resumen: {
      subtotal: subtotal,
      descuentoAplicado: descuentoAplicado,
      porcentajeDescuento: porcentajeDescuento,
      total: orden.Total,
      clienteCorporativo: cliente.corporativo,
      cuponAplicado: !!cupon,
      codigoCupon: cupon ? cupon.codigo : null
    }
  });
});

// Encendemos el servidor 
app.listen(PORT, () => { 
console.log(`✅ Servidor corriendo en http://localhost:${PORT}`); 
});