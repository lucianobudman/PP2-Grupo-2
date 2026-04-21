class Orden_Compra {
  constructor(id_Oreden_co, Fecha,Total,Estado,Iva,Descuento,Id_Cliente,Id_Cupon) {
    this.id_Oreden_co = id_Oreden_co;
    this.Fecha = Fecha;
    this.Total = Total;
    this.Descuento= 0;
    //estado por defecto al inicio pendiente?
    this.Estado = Estado;
    this.Id_Cliente = Id_Cliente;
    this.Id_Cupon = Id_Cupon;
    this.Iva = Iva;

    
    this.Detalle=[]
  }

  agregarDetalle(producto){
    this.Detalle.push(producto)
  }

  calcularTotal(){
    let subtotal= this.detalles.reduce((acc, det) => acc + det.subtotal(), 0);
    let porcentajeDescuento=0;

    if (this.Id_Cliente.corporativo){
      porcentajeDescuento=0.10;
    }else if(this.Id_Cupon && this.Id_Cupon.cuponValido){
      porcentajeDescuento=0.05
    }

    return subtotal*(1-porcentajeDescuento)
  }
}

