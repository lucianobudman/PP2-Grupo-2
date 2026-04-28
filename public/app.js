let carrito = [];

function cambiarCantidad(id, delta) {
  const input = document.getElementById(id);
  let valor = parseInt(input.value) + delta;
  if (valor < 1) valor = 1;
  if (valor > 99) valor = 99;
  input.value = valor;
}

function agregarAlCarrito(nombre, precio, cantId) {
  const cantidad = parseInt(document.getElementById(cantId).value);
  const existente = carrito.find(item => item.nombre === nombre);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

  actualizarCarrito();
  mostrarToast('✓ ' + nombre + ' agregado');
}

function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarCarrito();
}

function actualizarCarrito() {
  const tbody = document.getElementById('items-carrito');
  const tabla = document.getElementById('tabla-carrito');
  const empty = document.getElementById('cart-empty');
  const totalWrap = document.getElementById('total-wrap');
  const totalSpan = document.getElementById('total-general');
  const contador = document.getElementById('cart-count');

  tbody.innerHTML = '';

  if (carrito.length === 0) {
    tabla.style.display = 'none';
    empty.style.display = 'block';
    totalWrap.style.display = 'none';
    contador.textContent = '0';
    return;
  }

  tabla.style.display = 'table';
  empty.style.display = 'none';
  totalWrap.style.display = 'flex';

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    totalItems += item.cantidad;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <strong>${item.nombre}</strong>
        <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.nombre}')">× quitar</button>
      </td>
      <td style="color:rgba(255,255,255,0.4)">${item.cantidad} u.</td>
      <td>$${subtotal.toLocaleString('es-AR')}</td>
    `;
    tbody.appendChild(tr);
  });

  totalSpan.textContent = total.toLocaleString('es-AR');
  contador.textContent = totalItems;
}

function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2500);
}

function scrollAlCarrito() {
  document.getElementById('seccion-carrito').scrollIntoView({ behavior: 'smooth' });
}