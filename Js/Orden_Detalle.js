import { Productos } from "./Productos.js";

export class Orden_Detalle {
  constructor(id_orden, producto, cantidad) {
    this.id_orden = id_orden;
    this.producto = producto; // 🔥 guardamos el objeto completo
    this.cantidad = cantidad;
  }

  subtotal() {
    return this.cantidad * this.producto.Precio_Unitario;
  }
}