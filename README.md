# PP2 - Grupo 2

Aplicación web de e-commerce desarrollada para la práctica profesionalizante 2. El proyecto combina un backend en Node.js con Express y Sequelize, una base de datos SQLite y un frontend estático que permite realizar compras de forma sencilla.

El sistema está pensado como una tienda online básica, donde un cliente puede ver productos, seleccionar un cliente, agregar artículos al carrito, aplicar descuentos y completar una compra. Además, el backend expone una API REST para gestionar productos, clientes, cupones, órdenes y detalles de órdenes.

## 1. Objetivo del proyecto

El objetivo de esta aplicación es simular un proceso de compra completo en un entorno local, integrando:

- una interfaz de usuario para la tienda,
- una lógica de negocio para calcular descuentos,
- la gestión de stock,
- y la persistencia de datos mediante una base de datos relacional ligera.

Este proyecto sirve como ejemplo práctico de desarrollo full-stack básico con arquitectura cliente-servidor.

## 2. Funcionalidades principales

La aplicación permite realizar las siguientes acciones:

- Mostrar un catálogo de productos desde la API.
- Seleccionar un cliente antes de iniciar la compra.
- Agregar productos al carrito con cantidades.
- Aplicar descuentos según la condición del cliente.
- Generar una orden de compra al finalizar el checkout.
- Crear los detalles de la orden asociados a cada producto comprado.
- Descontar stock automáticamente después de una compra.
- Gestionar productos, clientes, cupones y órdenes mediante una API REST.

## 3. Reglas de negocio

El sistema aplica descuentos de la siguiente manera:

- Cliente corporativo: descuento automático del 10%.
- Cliente no corporativo con cupón TICKET5: descuento del 5%.
- Cliente no corporativo sin cupón: sin descuento.

Además, al completar una compra, se actualiza el stock disponible de los productos involucrados.

## 4. Tecnologías utilizadas

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

## 5. Estructura del proyecto

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

> Nota: el backend activo se encuentra en la carpeta backend. También existen carpetas históricas o de práctica como src y Js, que no forman parte del flujo principal actual.

## 6. Requisitos previos

Para ejecutar este proyecto localmente, necesitas:

- Node.js instalado
- npm instalado
- acceso a una terminal
- un navegador web

## 7. Instalación local

### 7.1 Clonar el repositorio

```bash
git clone https://github.com/lucianobudman/PP2-Grupo-2.git
cd PP2-Grupo-2
```

### 7.2 Entrar al backend

```bash
cd backend
```

### 7.3 Instalar dependencias

```bash
npm install
```

### 7.4 Crear archivo de variables de entorno

Crear un archivo llamado .env dentro de la carpeta backend con el siguiente contenido:

```env
PORT=3000
DB_DIALECT=sqlite
DB_STORAGE=./ecommerce.sqlite
```

Estas variables permiten configurar el puerto y la base de datos utilizada por Sequelize.

## 8. Cargar datos iniciales

Para crear la base de datos SQLite y cargar datos de ejemplo, ejecutar:

```bash
node seed.js
```

Este proceso inicializa datos como:

- productos de prueba,
- clientes de ejemplo,
- cupones de prueba,
- y la estructura base de la base de datos.

## 9. Ejecutar la aplicación

Desde la carpeta backend, iniciar el servidor con:

```bash
node server.js
```

Una vez iniciado, la aplicación estará disponible en:

```text
http://localhost:3000
```

El backend sirve también los archivos del frontend, por lo que al abrir esa URL se puede usar la interfaz de compra.

## 10. Variables de entorno

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| PORT | Puerto donde corre Express | 3000 |
| DB_DIALECT | Motor de base de datos utilizado por Sequelize | sqlite |
| DB_STORAGE | Ruta del archivo de la base SQLite | ./ecommerce.sqlite |

## 11. Modelos principales

### Producto

| Campo | Tipo | Descripción |
| --- | --- | --- |
| nombre | String | Nombre del producto |
| precio | Float | Precio unitario |
| stock | Integer | Cantidad disponible |

### Cliente

| Campo | Tipo | Descripción |
| --- | --- | --- |
| nombre | String | Nombre del cliente |
| apellido | String | Apellido del cliente |
| corporativo | Boolean | Indica si el cliente tiene descuento corporativo |

### Cupon

| Campo | Tipo | Descripción |
| --- | --- | --- |
| codigo | String | Código del cupón |
| fecha_validez | Date | Fecha hasta la cual el cupón es válido |

### OrdenCompra

| Campo | Tipo | Descripción |
| --- | --- | --- |
| fecha | Date | Fecha de la compra |
| total | Float | Total final de la orden |
| estado | String | Estado actual de la orden |
| iva | Float | IVA aplicado |
| descuento | Float | Descuento aplicado |
| clienteId | Integer | Cliente asociado |
| cuponId | Integer | Cupón asociado, si corresponde |

### OrdenDetalle

| Campo | Tipo | Descripción |
| --- | --- | --- |
| ordenId | Integer | Orden a la que pertenece el detalle |
| productoId | Integer | Producto comprado |
| cantidad | Integer | Cantidad solicitada |
| precio_unitario | Float | Precio al momento de la compra |

## 12. API REST disponible

La API se expone desde la siguiente base:

```text
http://localhost:3000/api
```

### 12.1 Productos

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | /productos | Lista todos los productos |
| GET | /productos/:id | Obtiene un producto por ID |
| POST | /productos | Crea un producto |
| PUT | /productos/:id | Actualiza un producto |
| DELETE | /productos/:id | Elimina un producto |

Ejemplo de creación:

```json
{
  "nombre": "Monitor 24",
  "precio": 120000,
  "stock": 8
}
```

### 12.2 Clientes

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | /clientes | Lista todos los clientes |
| GET | /clientes/:id | Obtiene un cliente por ID |
| POST | /clientes | Crea un cliente |
| PUT | /clientes/:id | Actualiza un cliente |
| DELETE | /clientes/:id | Elimina un cliente |

Ejemplo:

```json
{
  "nombre": "Ana",
  "apellido": "Martinez",
  "corporativo": false
}
```

### 12.3 Cupones

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | /cupones | Lista todos los cupones |
| GET | /cupones/:id | Obtiene un cupón por ID |
| POST | /cupones | Crea un cupón |
| PUT | /cupones/:id | Actualiza un cupón |
| DELETE | /cupones/:id | Elimina un cupón |

Ejemplo:

```json
{
  "codigo": "TICKET5",
  "fecha_validez": "2027-12-31"
}
```

### 12.4 Órdenes

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | /ordenes | Lista todas las órdenes |
| GET | /ordenes/:id | Obtiene una orden por ID |
| POST | /ordenes | Crea una orden manualmente |
| PUT | /ordenes/:id | Actualiza una orden |
| DELETE | /ordenes/:id | Elimina una orden |
| POST | /ordenes/checkout | Finaliza una compra |

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

### 12.5 Detalles de orden

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | /Orden_Detalle | Lista todos los detalles |
| POST | /Orden_Detalle | Crea un detalle |
| PUT | /Orden_Detalle | Actualiza un detalle usando id en el body |
| DELETE | /Orden_Detalle/:id | Elimina un detalle |

## 13. Flujo de compra desde el usuario

1. El frontend carga los productos disponibles.
2. El frontend carga los clientes.
3. El usuario selecciona un cliente.
4. Agrega productos al carrito.
5. Opcionalmente aplica un cupón.
6. Finaliza la compra.
7. El backend crea la orden, genera los detalles y actualiza el stock.

## 14. Uso del panel administrativo

Aunque la interfaz principal está orientada a la compra, el proyecto también cuenta con una lógica de administración para gestionar entidades clave del negocio. Desde la parte administrativa se puede:

- ver y administrar productos,
- gestionar clientes,
- crear o modificar cupones,
- revisar órdenes,
- y consultar los detalles asociados a cada compra.

## 15. Comandos útiles

```bash
# Instalar dependencias
npm install

# Crear la base de datos y cargar datos iniciales
node seed.js

# Iniciar el servidor
node server.js
```

## 16. Solución de problemas comunes

- Si el servidor no inicia, verificar que el archivo .env exista y tenga los valores correctos.
- Si no aparecen productos, ejecutar node seed.js nuevamente.
- Si hay errores de conexión con la base de datos, revisar que el archivo SQLite se haya creado correctamente.
- Si el puerto 3000 está ocupado, cambiar el valor de PORT en .env.

## 17. Estado del proyecto

Proyecto académico en desarrollo, con una base funcional para:

- venta básica,
- persistencia de datos,
- gestión de entidades principales,
- y flujo de checkout simple.

## 18. Integrantes

- Grupo 2
