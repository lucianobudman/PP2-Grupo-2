export class Cupones {
  constructor(id_Cu, fechaValidez, codigo) {
    this.id_Cu = id_Cu;
    this.fechaValidez = new Date(fechaValidez);
    this.codigo = codigo;
  }

  cuponValido() {
    const hoy = new Date();
    return hoy <= this.fechaValidez;
  }
}