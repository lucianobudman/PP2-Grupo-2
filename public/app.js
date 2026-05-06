let carrito = [];

async function cargarCatalogo() {
  try {
    const respuesta = await fetch('/api/productos');
    const productos = await respuesta.json();

    const contenedor = document.getElementById('catalogo');
    contenedor.innerHTML = '';

    productos.forEach((prod) => {
      const tarjeta = `
        <div class="col-md-4">
          <div class="card h-100 p-3">
            <div class="img-wrap">
              <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}" onerror="this.style.display='none'">
            </div>
            <div class="card-body p-0">
              <span class="badge-custom ${prod.tipoBadge} d-inline-block mb-2">${prod.badge}</span>
              <h5 class="card-title">${prod.nombre}</h5>
              <p class="card-text mb-3">${prod.descripcion}</p>
              <div class="precio mb-3"><span style="font-size:1rem; opacity:0.6;">$</span>${prod.precio.toLocaleString('es-AR')}</div>

              <div class="d-flex align-items-center gap-2 mb-3">
                <small style="color:rgba(255,255,255,0.35); text-transform:uppercase; font-size:0.68rem;">Cantidad</small>
                <button class="btn-cant" onclick="cambiarCantidad('cant-${prod.id}', -1)">−</button>
                <input type="number" id="cant-${prod.id}" value="1" min="1" max="99">
                <button class="btn-cant" onclick="cambiarCantidad('cant-${prod.id}', 1)">+</button>
              </div>

              <button class="btn-agregar" onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${prod.precio}, 'cant-${prod.id}')">
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      `;

      contenedor.innerHTML += tarjeta;
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

function cambiarCantidad(id, delta) {
  const input = document.getElementById(id);
  let valor = parseInt(input.value) + delta;

  if (valor < 1) {
    valor = 1;
  }

  if (valor > 99) {
    valor = 99;
  }

  input.value = valor;
}

function agregarAlCarrito(id, nombre, precio, cantId) {
  const cantidad = parseInt(document.getElementById(cantId).value);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ id, nombre, precio, cantidad });
  }

  actualizarCarrito();
  mostrarToast('✓ ' + nombre + ' agregado');
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
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
        <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">× quitar</button>
      </td>
      <td style="color:rgba(255,255,255,0.4)">${item.cantidad} u.</td>
      <td>$${subtotal.toLocaleString('es-AR')}</td>
    `;
    tbody.appendChild(tr);
  });

  totalSpan.textContent = total.toLocaleString('es-AR');
  contador.textContent = totalItems;
}

async function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  try {
    const respuesta = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carrito)
    });

    const resultado = await respuesta.json();

    alert(resultado.mensaje);

    carrito = [];
    actualizarCarrito();
  } catch (error) {
    console.error("Error en la compra:", error);
  }
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

cargarCatalogo();