class Clientes {
  constructor(id_ci, nombre, apellido, corporativo) {
    this.id_ci = id_ci;
    this.nombre = nombre;
    this.apellido = apellido;
    this.corporativo = corporativo;
  }

  static clientes = [];

  static agregarCliente(nuevoCliente) {
    if (nuevoCliente instanceof Clientes) {
      this.clientes.push(nuevoCliente);
      return(`Cliente "${nuevoCliente.nombre}" agregado.`);
    } else {
      return("El elemento no es un cliente válido.");
    }
  }

  static mostrarClientes() {
    return(this.clientes);
  }
}

module.exports = { Clientes };