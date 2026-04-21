import { Productos } from "./Productos.js";
import { Orden_Detalle } from "./Orden_Detalle.js";
import { Orden_Compra } from "./Orden_Compra.js";
import { Cupones } from "./Cupones.js";
import { Clientes } from "./Clientes.js";



const cliente = new Clientes(1, "Juan", "Pérez", false);



const cupon = new Cupones(1, "2026-12-31", "DESC5");


// ==============================
// 1. CREAR PRODUCTOS
// ==============================
const prod1 = new Productos(1, 10000, 0, "Teclado", "111");
const prod2 = new Productos(2, 5000, 10, "Mouse", "222");

Productos.agregarProducto(prod1);
Productos.agregarProducto(prod2);



// 2. CREAR ORDEN

const orden = new Orden_Compra(1, new Date(), cliente, cupon);



//  3. AGREGAR PRODUCTOS (VALIDANDO STOCK)

function agregarProductoAOrden(producto, cantidad) {
  if (producto.hayStock(cantidad)) {
    producto.reducirStock(cantidad);

    const detalle = new Orden_Detalle(orden.id_orden, producto, cantidad);
    orden.agregarDetalle(detalle);

    console.log(`✅ Agregado: ${producto.Nombre} x${cantidad}`);
  } else {
    console.log(`❌ Sin stock: ${producto.Nombre}`);
  }
}

agregarProductoAOrden(prod1, 1);
agregarProductoAOrden(prod2, 2);


//  4. SIMULAR PAGO

function verificarPago() {
  return true; // 🔥 forzamos pago exitoso
}


// 5. EMITIR TICKET

function emitirTicket(orden) {
  console.log("\n🧾 ===== TICKET =====");
  console.log(`Cliente: ${orden.cliente.nombre} ${orden.cliente.apellido}`);
  console.log(`Fecha: ${orden.fecha.toLocaleString()}`);

  console.log("\nProductos:");
  orden.detalles.forEach(det => {
    console.log(
      `${det.producto.Nombre} x${det.cantidad} - $${det.subtotal()}`
    );
  });

  console.log("\n--------------------");
  console.log(`Descuento: $${orden.descuento}`);
  console.log(`IVA: ${orden.iva * 100}%`);
  console.log(`TOTAL: $${orden.total}`);
  console.log("✅ Compra confirmada");
  console.log("====================\n");
}



orden.calcularTotal();

if (verificarPago()) {
  orden.confirmarCompra();
  emitirTicket(orden);
} else {
  console.log("❌ Pago rechazado");
}