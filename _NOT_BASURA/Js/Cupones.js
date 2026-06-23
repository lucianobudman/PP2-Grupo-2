class Cupones {
  static cupones = [];

  constructor(id_Cu, fecha_validez, codigo) {
    this.id_Cu = id_Cu;
    this.fecha_validez = new Date(fecha_validez);
    this.codigo = codigo;
  }

  cuponValido() {
    return new Date() <= this.fecha_validez;
  }

  static agregarCupon(cupon) {
    this.cupones.push(cupon);
  }

  static obtenerCupon(id) {
    return this.cupones.find(c => c.id_Cu === id) || null;
  }

  static actualizarCupon(id, datos) {
    const cupon = this.cupones.find(c => c.id_Cu === id);
    if (!cupon) return null;
    if (datos.fecha_validez !== undefined) cupon.fecha_validez = new Date(datos.fecha_validez);
    if (datos.codigo !== undefined) cupon.codigo = datos.codigo;
    return cupon;
  }

  static eliminarCupon(id) {
    const index = this.cupones.findIndex(c => c.id_Cu === id);
    if (index === -1) return null;
    this.cupones.splice(index, 1);
    return `Cupón ${id} eliminado.`;
  }

  static mostrarCupones() {
    return this.cupones;
  }
}

module.exports = { Cupones };