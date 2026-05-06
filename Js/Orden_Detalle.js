const { Productos } = require("./Productos");

class Orden_Detalle {
  constructor(id_Oreden_co, Precio_Uni, id_Oreden_de, id_Producto, Cantidad) {
    this.id_Oreden_co = id_Oreden_co;
    this.id_Oreden_de = id_Oreden_de;
    this.id_Producto = id_Producto;
    this.Cantidad = Cantidad;
    this.Precio_Uni = Precio_Uni; // Usamos el que llega por parámetro
  }

  subtotal() {
    return this.Cantidad * this.Precio_Uni;
  }

  // Ahora recibe las instancias por parámetro para poder agruparlas
 static mostrarDetallesPorOrden(instancias) { // <--- IMPORTANTE: Recibe el array aquí
    if (!instancias || instancias.length === 0) return null;

    // Usamos el nombre que tienes en el constructor (id_Oreden_co)
    const idOrdenPrincipal = instancias[0].id_Oreden_co; 

    return {
        idOrden: idOrdenPrincipal,
        totalOrden: instancias.reduce((acc, inst) => acc + inst.subtotal(), 0),
        detalles: instancias.map(inst => ({
            id_detalle: inst.id_Oreden_de,
            id_Producto: inst.id_Producto,
            Cantidad: inst.Cantidad,
            Precio_unitario: inst.Precio_Uni,
            Subtotal: inst.subtotal()
        }))
    };
}

  static CambiarRegistros(registros) {
    return registros.map(reg => new Orden_Detalle(
      reg.id_Orden_co,
      reg.Precio_Uni,
      reg.id_Orden_de,
      reg.id_Producto,
      reg.Cantidad
    ));
  }

  static borrar(id) {
    console.log(`Eliminando registro con ID: ${id}`);
  
    return true;
  }

}



module.exports = { Orden_Detalle };