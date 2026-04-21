class Cupones {
  constructor(id_Cu, Fecha_validez, Codigo) {
    this.id_Cu = id_CU;
    this.Fecha_validez = new Date(fechaValidez);
    this.Codigo = Codigo;

  }

  cuponValido() {
    const hoy = new Date();
    return hoy <= this.fechaValidez;
  }
  
}