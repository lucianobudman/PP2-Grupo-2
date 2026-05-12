class Orden_Compra {
  constructor(id_Oreden_co, Fecha, Total, Estado, Iva, Descuento, Id_Cliente, Id_Cupon) {
    this.id_Oreden_co = id_Oreden_co;
    this.Fecha = Fecha;
    this.Total = Total;
    this.Descuento = 0;
    this.Estado = Estado;
    this.Id_Cliente = Id_Cliente;
    this.Id_Cupon = Id_Cupon;
    this.Iva = Iva;
    this.Detalle = [];
  }

  static ordenes = [];

  static agregarOrden(orden) {
    if (orden instanceof Orden_Compra) {
      this.ordenes.push(orden);
      return `Orden ${orden.id_Oreden_co} agregada.`;
    } else {
      return "El elemento no es una orden válida.";
    }
  }

  static obtenerOrden(id) {
    return this.ordenes.find(o => o.id_Oreden_co === id) || null;
  }

  static actualizarOrden(id, datos) {
    const orden = this.ordenes.find(o => o.id_Oreden_co === id);
    if (!orden) return null;
    if (datos.Estado !== undefined) orden.Estado = datos.Estado;
    return orden;
  }

  static eliminarOrden(id) {
    const index = this.ordenes.findIndex(o => o.id_Oreden_co === id);
    if (index === -1) return null;
    this.ordenes.splice(index, 1);
    return `Orden ${id} eliminada.`;
  }

  static mostrarOrdenes() {
    return this.ordenes.map(orden => orden.mostrarResumen());
  }

  agregarDetalle(detalle) {
    this.Detalle.push(detalle);
  }

  calcularTotal() {
    let subtotal = this.Detalle.reduce((acc, det) => acc + det.subtotal(), 0);
    let porcentajeDescuento = 0;
    if (this.Id_Cliente && this.Id_Cliente.corporativo) {
      porcentajeDescuento = 0.10;
    } else if (this.Id_Cupon && this.Id_Cupon.cuponValido) {
      porcentajeDescuento = 0.05;
    }
    return subtotal * (1 - porcentajeDescuento);
  }

  mostrarResumen() {
    const subtotal = this.Detalle.reduce((acc, det) => acc + det.subtotal(), 0);
    const total = this.calcularTotal();
    const descuentoAplicado = subtotal - total;
    const porcentajeDescuento = this.Id_Cliente && this.Id_Cliente.corporativo ? 10 : (this.Id_Cupon && this.Id_Cupon.cuponValido ? 5 : 0);

    return {
      idOrden: this.id_Oreden_co,
      fecha: this.Fecha,
      estado: this.Estado,
      cliente: this.Id_Cliente ? `${this.Id_Cliente.nombre} ${this.Id_Cliente.apellido}` : 'Desconocido',
      corporativo: this.Id_Cliente ? this.Id_Cliente.corporativo : false,
      cupon: this.Id_Cupon ? this.Id_Cupon.codigo : null,
      detalles: this.Detalle.map(det => ({
        idProducto: det.id_Producto,
        precioUnitario: det.Precio_Uni,
        cantidad: det.Cantidad,
        subtotal: det.subtotal()
      })),
      resumen: {
        subtotal,
        descuentoAplicado,
        porcentajeDescuento,
        total
      }
    };
  }
}

module.exports = { Orden_Compra };