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
      return `Cliente "${nuevoCliente.nombre}" agregado.`;
    } else {
      return "El elemento no es un cliente válido.";
    }
  }

  static obtenerCliente(id) {
    return this.clientes.find(c => c.id_ci === id) || null;
  }

  static actualizarCliente(id, datos) {
    const cliente = this.clientes.find(c => c.id_ci === id);
    if (!cliente) return null;
    if (datos.nombre !== undefined) cliente.nombre = datos.nombre;
    if (datos.apellido !== undefined) cliente.apellido = datos.apellido;
    if (datos.corporativo !== undefined) cliente.corporativo = datos.corporativo;
    return cliente;
  }

  static eliminarCliente(id) {
    const index = this.clientes.findIndex(c => c.id_ci === id);
    if (index === -1) return null;
    this.clientes.splice(index, 1);
    return `Cliente ${id} eliminado.`;
  }

  static mostrarClientes() {
    return this.clientes;
  }
}

module.exports = { Clientes };