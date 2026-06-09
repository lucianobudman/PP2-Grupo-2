# Agents

Guia rapida para agentes o colaboradores que trabajen en este repositorio.

## Contexto del proyecto

Este repositorio contiene una aplicacion web de e-commerce para Practica Profesionalizante 2.

- Backend activo: `backend/`
- Frontend activo: `frontend/`
- Base de datos: SQLite mediante Sequelize
- Servidor: Express

Tambien existen carpetas historicas o de practica como `src/` y `Js/`. Antes de modificar esas carpetas, verificar si realmente forman parte del flujo actual.

## Comandos principales

Ejecutar los comandos desde `backend/`.

```bash
npm install
node seed.js
node server.js
```

El servidor queda disponible en:

```text
http://localhost:3000
```

## Variables de entorno

Crear un archivo `.env` dentro de `backend/` con:

```env
PORT=3000
DB_DIALECT=sqlite
DB_STORAGE=./ecommerce.sqlite
```

## Estructura importante

```text
backend/
+-- config/database.js
+-- controllers/
+-- models/
+-- routes/
+-- seed.js
+-- server.js

frontend/
+-- index.html
+-- js/app.js
```

## Reglas de trabajo

- Mantener los cambios acotados al pedido.
- No borrar ni reemplazar cambios existentes sin confirmar que pertenecen a la tarea.
- Usar el backend de `backend/` como fuente principal.
- Mantener sincronizados modelos, rutas y controladores cuando se agregue una entidad o campo.
- Si se cambia el flujo de compra, revisar tambien `frontend/js/app.js` y `backend/controllers/ordenesController.js`.
- Si se modifica la estructura de datos inicial, actualizar `backend/seed.js` y el `README.md`.
- No versionar `node_modules/`, archivos `.env` ni bases SQLite generadas.

## Flujo de compra actual

1. El frontend carga productos desde `/api/productos`.
2. El frontend carga clientes desde `/api/clientes`.
3. El usuario selecciona cliente.
4. El usuario agrega productos al carrito.
5. El usuario puede aplicar el cupon `TICKET5`.
6. El checkout se envia a `/api/ordenes/checkout`.
7. El backend crea la orden, crea los detalles y descuenta stock.

## Descuentos

- Cliente corporativo: 10% automatico.
- Cliente no corporativo con cupon `TICKET5`: 5%.
- Cliente no corporativo sin cupon: sin descuento.

## Endpoints principales

Base URL:

```text
http://localhost:3000/api
```

- `/productos`
- `/clientes`
- `/cupones`
- `/ordenes`
- `/ordenes/checkout`
- `/Orden_Detalle`

## Verificacion sugerida

Despues de modificar codigo:

1. Ejecutar `node seed.js` si cambian modelos o datos iniciales.
2. Ejecutar `node server.js`.
3. Abrir `http://localhost:3000`.
4. Probar carga de productos, seleccion de cliente, carrito y checkout.

