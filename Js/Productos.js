export class Productos {
  constructor(Id_P,Precio_Unitario , Stock,Nombre,codigoBarra) {
    this.Id_P = Id_P;
    this.Precio_Unitario = Precio_Unitario;
    this.Stock = Stock;
    this.Nombre = Nombre;
    this.codigoBarra =codigoBarra;
  }

  static inventario = [];

  static agregarProducto(nuevoProducto) {
    if (nuevoProducto instanceof Productos) {
      this.inventario.push(nuevoProducto);
      return(`Producto "${nuevoProducto.nombre}" agregado al inventario.`);
    } else {
      return("El elemento no es un producto válido.");
    }
  }

  static mostrarInventario() {
    return(this.inventario);
  }

  hayStock(cantidadRequerida){
    return this.Stock>=cantidadRequerida
  }

  reducirStock(cantidad){
    this.stock-=cantidad
  }

}





  


