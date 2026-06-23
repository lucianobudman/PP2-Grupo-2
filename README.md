# PP2 - Grupo 2

Aplicacion web de e-commerce desarrollada para Practica Profesionalizante 2. El proyecto incluye una API REST con Node.js, Express, Sequelize y SQLite, junto con un frontend estatico en HTML, CSS, Bootstrap y JavaScript.

La app permite listar productos, seleccionar un cliente, agregar productos al carrito, aplicar descuentos y finalizar una compra generando una orden con sus detalles.

## Funcionalidades

- Catalogo de productos cargado desde la API.
- Carrito de compras con cantidades, subtotales y total general.
- Seleccion de cliente antes de finalizar la compra.
- Descuento automatico del 10% para clientes corporativos.
- Cupon `TICKET5` con 5% de descuento para clientes no corporativos.
- Checkout con creacion de orden de compra y detalle de orden.
- Actualizacion de stock despues de una compra.
- CRUD basico para productos, clientes, cupones, ordenes y detalles.

## Tecnologias

- Node.js
- Express
- Sequelize
- SQLite
- dotenv
- CORS
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Estructura del proyecto

```text
PP2-Grupo-2/
+-- backend/
|   +-- config/
|   |   +-- database.js
|   +-- controllers/
|   |   +-- clientesController.js
|   |   +-- cuponesController.js
|   |   +-- ordenDetalleController.js
|   |   +-- ordenesController.js
|   |   +-- productosController.js
|   +-- models/
|   |   +-- Cliente.js
|   |   +-- Cupon.js
|   |   +-- OrdenCompra.js
|   |   +-- OrdenDetalle.js
|   |   +-- Producto.js
|   +-- routes/
|   |   +-- clientesRoutes.js
|   |   +-- cuponesRoutes.js
|   |   +-- ordenDetalleRoutes.js
|   |   +-- ordenesRoutes.js
|   |   +-- productosRoutes.js
|   +-- package.json
|   +-- seed.js
|   +-- server.js
+-- frontend/
|   +-- index.html
|   +-- js/
|       +-- app.js
+-- src/
+-- Js/
+-- .gitignore
+-- README.md
```

> Nota: el backend activo se encuentra en la carpeta `backend/`. Tambien existen carpetas historicas o de practica como `src/` y `Js/`.

## Requisitos previos

- Node.js instalado.
- npm instalado.

## Instalacion

1. Clonar el repositorio:

```bash
git clone https://github.com/lucianobudman/PP2-Grupo-2.git
cd PP2-Grupo-2
```

2. Entrar a la carpeta del backend:

```bash
cd backend
```

3. Instalar dependencias:

```bash
npm install
```

4. Crear un archivo `.env` dentro de `backend/` con esta configuracion:

```env
PORT=3000
DB_DIALECT=sqlite
DB_STORAGE=./ecommerce.sqlite
```

## Cargar datos iniciales

Para crear la base de datos SQLite y cargar productos, clientes y cupones de ejemplo:

```bash
node seed.js
```

El seed carga:

- Productos:
  - Smartphone X-1
  - Laptop Pro Max
  - Audio Ultra G
- Clientes:
  - Juan Perez
  - Maria Garcia, cliente corporativo
  - Carlos Lopez
- Cupon:
  - `TICKET5`

## Ejecutar el proyecto

Desde la carpeta `backend/`:

```bash
node server.js
```

El servidor queda disponible en:

```text
http://localhost:3000
```

El backend tambien sirve los archivos del frontend, por lo que al abrir esa URL se accede a la interfaz de compra.

## Variables de entorno

| Variable | Descripcion | Ejemplo |
| --- | --- | --- |
| `PORT` | Puerto donde corre Express | `3000` |
| `DB_DIALECT` | Motor de base de datos usado por Sequelize | `sqlite` |
| `DB_STORAGE` | Ruta del archivo SQLite | `./ecommerce.sqlite` |

## Modelos principales

### Producto

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `nombre` | String | Nombre del producto |
| `precio` | Float | Precio unitario |
| `stock` | Integer | Unidades disponibles |

### Cliente

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `nombre` | String | Nombre del cliente |
| `apellido` | String | Apellido del cliente |
| `corporativo` | Boolean | Indica si recibe descuento corporativo |

### Cupon

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `codigo` | String | Codigo del cupon |
| `fecha_validez` | Date | Fecha de vencimiento |

### OrdenCompra

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `fecha` | Date | Fecha de la compra |
| `total` | Float | Total final |
| `estado` | String | Estado de la orden |
| `iva` | Float | IVA aplicado |
| `descuento` | Float | Porcentaje de descuento |
| `clienteId` | Integer | Cliente asociado |
| `cuponId` | Integer | Cupon asociado, si corresponde |

### OrdenDetalle

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `ordenId` | Integer | Orden asociada |
| `productoId` | Integer | Producto comprado |
| `cantidad` | Integer | Cantidad comprada |
| `precio_unitario` | Float | Precio usado en la compra |

## Endpoints de la API

Base URL:

```text
http://localhost:3000/api
```

### Productos

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/:id` | Obtiene un producto por ID |
| POST | `/productos` | Crea un producto |
| PUT | `/productos/:id` | Actualiza un producto |
| DELETE | `/productos/:id` | Elimina un producto |

Ejemplo para crear producto:

```json
{
  "nombre": "Monitor 24",
  "precio": 120000,
  "stock": 8
}
```

### Clientes

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/clientes` | Lista todos los clientes |
| GET | `/clientes/:id` | Obtiene un cliente por ID |
| POST | `/clientes` | Crea un cliente |
| PUT | `/clientes/:id` | Actualiza un cliente |
| DELETE | `/clientes/:id` | Elimina un cliente |

Ejemplo para crear cliente:

```json
{
  "nombre": "Ana",
  "apellido": "Martinez",
  "corporativo": false
}
```

### Cupones

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/cupones` | Lista todos los cupones |
| GET | `/cupones/:id` | Obtiene un cupon por ID |
| POST | `/cupones` | Crea un cupon |
| PUT | `/cupones/:id` | Actualiza un cupon |
| DELETE | `/cupones/:id` | Elimina un cupon |

Ejemplo para crear cupon:

```json
{
  "codigo": "TICKET5",
  "fecha_validez": "2027-12-31"
}
```

### Ordenes

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/ordenes` | Lista todas las ordenes |
| GET | `/ordenes/:id` | Obtiene una orden por ID |
| POST | `/ordenes` | Crea una orden manualmente |
| PUT | `/ordenes/:id` | Actualiza una orden |
| DELETE | `/ordenes/:id` | Elimina una orden |
| POST | `/ordenes/checkout` | Finaliza una compra |

Ejemplo de checkout:

```json
{
  "clienteId": 1,
  "cuponCode": "TICKET5",
  "items": [
    {
      "nombre": "Smartphone X-1",
      "precio": 85000,
      "cantidad": 2
    }
  ]
}
```

Respuesta esperada:

```json
{
  "mensaje": "Orden creada",
  "resumen": {
    "subtotal": 170000,
    "descuentoAplicado": 8500,
    "porcentajeDescuento": 5,
    "total": 161500,
    "clienteCorporativo": false,
    "cuponAplicado": true,
    "codigoCupon": "TICKET5"
  }
}
```

### Detalles de orden

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/Orden_Detalle` | Lista todos los detalles |
| POST | `/Orden_Detalle` | Crea un detalle |
| PUT | `/Orden_Detalle` | Actualiza un detalle usando `id` en el body |
| DELETE | `/Orden_Detalle/:id` | Elimina un detalle |

## Flujo de compra

1. El frontend carga productos desde `/api/productos`.
2. El frontend carga clientes desde `/api/clientes`.
3. El usuario selecciona un cliente.
4. El usuario agrega productos al carrito.
5. Opcionalmente aplica el cupon `TICKET5`.
6. Al finalizar, se envia un `POST` a `/api/ordenes/checkout`.
7. El backend valida el cliente, calcula descuentos, crea la orden, crea los detalles y descuenta stock.

## Reglas de descuento

| Caso | Descuento |
| --- | --- |
| Cliente corporativo | 10% automatico |
| Cliente no corporativo con cupon `TICKET5` | 5% |
| Cliente no corporativo sin cupon | Sin descuento |

Los clientes corporativos no usan el cupon `TICKET5` desde el frontend porque ya tienen el descuento automatico del 10%.

## Comandos utiles

```bash
# Instalar dependencias
npm install

# Crear base de datos y datos iniciales
node seed.js

# Iniciar servidor
node server.js
```

## Estado del proyecto

Proyecto academico en desarrollo. La base funcional incluye API REST, persistencia con SQLite, carga inicial de datos, carrito en frontend y flujo de checkout.

## Integrantes

- Grupo 2
