class Productos {
  constructor(Id_P, Precio_Unitario, Stock, Nombre, codigoBarra) {
    this.Id_P = Id_P;
    this.Precio_Unitario = Precio_Unitario;
    this.Stock = Stock;
    this.Nombre = Nombre;
    this.codigoBarra = codigoBarra;
  }

  static inventario = [];

  static agregarProducto(nuevoProducto) {
    if (nuevoProducto instanceof Productos) {
      this.inventario.push(nuevoProducto);
      return `Producto "${nuevoProducto.Nombre}" agregado al inventario.`;
    } else {
      return "El elemento no es un producto válido.";
    }
  }

  static obtenerProducto(id) {
    return this.inventario.find(p => p.Id_P === id) || null;
  }

  static actualizarProducto(id, datos) {
    const producto = this.inventario.find(p => p.Id_P === id);
    if (!producto) return null;
    if (datos.Precio_Unitario !== undefined) producto.Precio_Unitario = datos.Precio_Unitario;
    if (datos.Stock !== undefined) producto.Stock = datos.Stock;
    if (datos.Nombre !== undefined) producto.Nombre = datos.Nombre;
    if (datos.codigoBarra !== undefined) producto.codigoBarra = datos.codigoBarra;
    return producto;
  }

  static eliminarProducto(id) {
    const index = this.inventario.findIndex(p => p.Id_P === id);
    if (index === -1) return null;
    this.inventario.splice(index, 1);
    return `Producto ${id} eliminado.`;
  }

  static mostrarInventario() {
    return this.inventario;
  }

  hayStock(cantidadRequerida) {
    return this.Stock >= cantidadRequerida;
  }

  reducirStock(cantidad) {
    this.Stock -= cantidad;
  }
}

module.exports = { Productos };




  


