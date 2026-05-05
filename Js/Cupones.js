class Cupones {
  static cupones = [];

  constructor(id_Cu, fecha_validez, codigo) {
    this.id_Cu = id_Cu;
    this.fecha_validez = new Date(fecha_validez);
    this.codigo = codigo;
  }

  cuponValido() {
    const hoy = new Date();
    return hoy <= this.fecha_validez;
  }

  static agregarCupon(cupon) {
    Cupones.cupones.push(cupon);
  }

  static mostrarCupones() {
    return Cupones.cupones;
  }
}

module.exports = { Cupones };