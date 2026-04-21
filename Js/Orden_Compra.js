export class Orden_Compra {
  constructor(id_orden, fecha, cliente, cupon = null) {
    this.id_orden = id_orden;
    this.fecha = fecha;
    this.cliente = cliente;
    this.cupon = cupon;

    this.estado = "pendiente";
    this.detalles = [];

    this.total = 0;
    this.descuento = 0;
    this.iva = 0.21; // 21% típico
  }

  agregarDetalle(detalle) {
    this.detalles.push(detalle);
  }

calcularTotal() {
  let subtotal = this.detalles.reduce(
    (acc, det) => acc + det.subtotal(),
    0
  );

  let porcentajeDescuento = 0;

  // 🔹 Cliente corporativo → 10% FIJO
  if (this.cliente.corporativo) {
    porcentajeDescuento = 0.10;
  }

  // 🔹 Cupón (solo si NO es corporativo)
  else if (this.cupon && this.cupon.cuponValido()) {
    porcentajeDescuento = 0.05;
  }

  this.descuento = subtotal * porcentajeDescuento;

  let totalConDescuento = subtotal - this.descuento;

  this.total = totalConDescuento * (1 + this.iva);

  return this.total;
}

  confirmarCompra() {
    this.estado = "confirmada";
  }
}