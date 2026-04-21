import { Productos } from "./Productos.js";

export class Orden_Detalle {
  constructor(id_orden, producto, cantidad) {
    this.id_orden = id_orden;
    this.producto = producto;
    this.cantidad = cantidad;

    // 🔥 PRECIO HISTÓRICO
    this.precioUnitario = producto.Precio_Unitario;
  }

  subtotal() {
    return this.cantidad * this.precioUnitario;
  }
}