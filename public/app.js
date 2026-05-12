let carrito = [];
let clienteActivo = null;
let cuponActivo = null;

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

// Cargar productos desde el servidor
async function cargarProductos() {
  try {
    const response = await fetch('/api/productos');
    const productos = await response.json();
    renderProductos(productos);
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}

// Cargar clientes desde el servidor
async function cargarClientes() {
  try {
    const response = await fetch('/api/clientes');
    const clientes = await response.json();
    renderClientes(clientes);
  } catch (error) {
    console.error('Error cargando clientes:', error);
  }
}

// Renderizar selector de clientes
function renderClientes(clientes) {
  const select = document.getElementById('cliente-select');
  select.innerHTML = '<option value="">Seleccionar cliente...</option>';
  
  clientes.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.id_ci;
    option.textContent = `${cliente.nombre} ${cliente.apellido}${cliente.corporativo ? ' (Corporativo)' : ''}`;
    select.appendChild(option);
  });
}

function loginCliente() {
  const select = document.getElementById('cliente-select');
  const clienteId = parseInt(select.value);
  const loginStatus = document.getElementById('login-status');
  const cuponStatus = document.getElementById('cupon-status');

  cuponActivo = null;
  document.getElementById('cupon-input').value = '';
  cuponStatus.textContent = 'Cupón no aplicado.';

  if (!clienteId) {
    clienteActivo = null;
    loginStatus.textContent = 'Cliente no seleccionado.';
    return;
  }

  fetch('/api/clientes')
    .then(r => r.json())
    .then(clientes => {
      clienteActivo = clientes.find(c => c.id_ci === clienteId);
      if (clienteActivo) {
        loginStatus.textContent = `Conectado como ${clienteActivo.nombre} ${clienteActivo.apellido}${clienteActivo.corporativo ? ' (Corporativo)' : ''}`;
      } else {
        loginStatus.textContent = 'Cliente no encontrado.';
      }
    })
    .catch(error => {
      console.error('Error cargando cliente:', error);
      loginStatus.textContent = 'Error al cargar cliente.';
    });
}

function aplicarCupon() {
  const cuponInput = document.getElementById('cupon-input');
  const cuponStatus = document.getElementById('cupon-status');
  const codigo = cuponInput.value.trim().toUpperCase();

  if (!clienteActivo) {
    cuponStatus.textContent = 'Selecciona un cliente antes de aplicar el cupón.';
    cuponActivo = null;
    return;
  }

  if (clienteActivo.corporativo) {
    cuponStatus.textContent = 'Los clientes corporativos no pueden usar este cupón.';
    cuponActivo = null;
    return;
  }

  if (codigo === 'TICKET5') {
    cuponActivo = codigo;
    cuponStatus.textContent = 'Cupón aplicado: 5% de descuento!';
  } else {
    cuponActivo = null;
    cuponStatus.textContent = 'Cupón inválido. Usa TICKET5.';
  }
}

// Renderizar productos en el catálogo
function renderProductos(productos) {
  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = '';

  productos.forEach((producto, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 p-3">
        <div class="img-wrap">
          <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80" class="card-img-top" alt="${producto.Nombre}" onerror="this.style.display='none'">
        </div>
        <div class="card-body p-0">
          <span class="badge-custom badge-nuevo d-inline-block mb-2">Disponible</span>
          <h5 class="card-title">${producto.Nombre}</h5>
          <p class="card-text mb-3">Producto de alta calidad</p>
          <div class="precio mb-3"><span style="font-size:1rem; opacity:0.6;">$</span>${producto.Precio_Unitario.toLocaleString('es-AR')}</div>
          <div class="d-flex align-items-center gap-2 mb-3">
            <small style="color:rgba(255,255,255,0.35); text-transform:uppercase; font-size:0.68rem;">Cantidad</small>
            <button class="btn-cant" onclick="cambiarCantidad('cant-${index}', -1)">−</button>
            <input type="number" id="cant-${index}" value="1" min="1" max="${producto.Stock}">
            <button class="btn-cant" onclick="cambiarCantidad('cant-${index}', 1)">+</button>
          </div>
          <button class="btn-agregar" onclick="agregarAlCarrito('${producto.Nombre}', ${producto.Precio_Unitario}, 'cant-${index}')">Añadir al carrito</button>
        </div>
      </div>
    `;
    catalogo.appendChild(col);
  });
}

// Finalizar compra
async function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarToast('El carrito está vacío');
    return;
  }

  const clienteSelect = document.getElementById('cliente-select');
  const clienteId = parseInt(clienteSelect.value);
  
  if (!clienteId) {
    mostrarToast('Por favor selecciona un cliente');
    return;
  }

  try {
    if (!clienteActivo) {
      mostrarToast('Por favor inicia sesión como cliente antes de finalizar la compra');
      return;
    }

    const response = await fetch('/api/ordenes/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: carrito,
        clienteId: clienteActivo.id_ci,
        cuponCode: cuponActivo
      })
    });
    const result = await response.json();
    
    // Mostrar mensaje detallado con descuento
    const resumen = result.resumen;
    let mensaje = '✅ Compra finalizada exitosamente';
    
    if (resumen.descuentoAplicado > 0) {
      mensaje += `\n💰 Subtotal: $${resumen.subtotal.toLocaleString('es-AR')}`;
      mensaje += `\n🎁 Descuento (${resumen.porcentajeDescuento}%): -$${resumen.descuentoAplicado.toLocaleString('es-AR')}`;
      mensaje += `\n💳 Total: $${resumen.total.toLocaleString('es-AR')}`;
    } else {
      mensaje += `\n💳 Total: $${resumen.total.toLocaleString('es-AR')}`;
    }
    
    mostrarToast(mensaje);
    carrito = [];
    actualizarCarrito();
  } catch (error) {
    console.error('Error finalizando compra:', error);
    mostrarToast('Error al finalizar la compra');
  }
}

// Cargar productos y clientes al iniciar
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  cargarClientes();
});