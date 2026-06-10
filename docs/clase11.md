G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
Clase 11: Panel Administrador,
Paginación y Buenas Prácticas
Mantenimiento, Optimización y Robustez
Repositorio del proyecto:
🔗 github.com/fabioitaliano-coder/ecommerce-ifts16
🎯 Tema de la Clase
En la clase anterior resolvimos una parte clave para la seguridad de nuestra aplicación:
● La aplicación ya distingue usuarios.
● Implementamos un flujo de autenticación con inicio de sesión (Login).
● Definimos roles específicos (admin y client).
● Bloqueamos acciones sensibles en el backend mediante middlewares de control.
Sin embargo, para finalizar el ciclo de desarrollo de este e-commerce, nos quedan dos cierres
fundamentales:
1. Que el perfil de administrador tenga herramientas operativas reales para gestionar
todo el catálogo.
2. Que nuestra API deje de responder de manera ingenua (retornando listados infinitos
de una sola vez) y aprenda a paginar los recursos eficientemente.
La idea principal de esta clase es la siguiente:
💡 No alcanza con mostrar un panel de administración visual; también hace falta
que la API y el frontend trabajen con criterios y contratos de datos cercanos a un
estándar profesional de la industria.
🛑 ¿Qué problema resolvemos hoy?
Hasta esta etapa de la cursada, el proyecto contaba con un catálogo visible, un flujo de
checkout básico, control de sesiones persistidas por JWT y un esquema CRUD en el backend
para las entidades.
No obstante, se presentaban varios inconvenientes de arquitectura y de experiencia de
usuario (UX):
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
● Panel desordenado: Mostrar todas las entidades al mismo tiempo en una sola pantalla
volvía la interfaz caótica, ruidosa y confusa.
● API ingenua (Falta de escalabilidad): Si la base de datos crecía a miles de registros,
retornar todos los productos en una sola petición HTTP degradaba el rendimiento del
servidor y saturaba la memoria del cliente.
● Exposición de datos sensibles: Mantener públicos los listados completos de clientes o
códigos de descuento permitía que cualquier visitante los consultara.
● Falta de interoperabilidad: El administrador del negocio no tenía manera de exportar los
listados para analizarlos en herramientas administrativas tradicionales como Excel.
Por ello, en esta clase resolvemos estos cuatro frentes estratégicos de forma simultánea:
1. Mantenimiento real de entidades: ABM completo (Alta, Baja, Modificación) de
productos, categorías, clientes y descuentos.
2. Navegación administrativa por secciones: Diseño enfocado en pestañas dinámicas en
el frontend para reducir el ruido visual.
3. Paginación en API y Frontend: Traspasar el control del volumen de datos a ambos lados
mediante los parámetros estándar page y limit.
4. Exportación CSV: Generación de archivos legibles por Excel sin sobrecargar el servidor
con librerías pesadas.
📦 Estado del Proyecto antes de estos cambios
Es muy valioso notar que no estamos reescribiendo la aplicación desde cero. El punto de
partida de hoy ya dispone de:
● Sesión persistida de manera segura en localStorage.
● Redirección o visualización condicionada al rol de administrador.
● Controladores de backend para las entidades principales.
● Estructuras visuales iniciales dentro de public/index.html y public/app.js.
Esto es pedagógicamente enriquecedor: No creamos código de descarte; estamos
profesionalizando, ordenando y robusteciendo una base que ya es funcional.
🎯 Objetivos de Aprendizaje
Al finalizar esta clase, serás capaz de:
● Explicar por qué un panel de administración debe construirse de forma segmentada
(secciones/pestañas) en lugar de apilar información.
● Entender los riesgos de rendimiento al consultar colecciones completas sin límites
establecidos.
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
● Utilizar e implementar los parámetros query page y limit en el backend con Sequelize.
● Interpretar y formatear la metadata de una respuesta estructurada de paginación.
● Diseñar un formateador CSV personalizado en Node.js que genere descargas
compatibles con Microsoft Excel.
● Diferenciar con claridad entre endpoints públicos para el catálogo de compras y
endpoints de uso administrativo protegido.
💡 Idea Fuerza de la Clase
┌─────────────────────────────────────────
────────────────────┐
│ CLASE 10: "Seguridad Básica" │
│ ¿Quién puede ingresar a la app y qué permisos tiene? │
└──────────────────────────────┬──────────
────────────────────┘
│
▼
┌─────────────────────────────────────────
────────────────────┐
│ CLASE 11: "Escalabilidad y Operatividad" │
│ ¿Cómo administra el usuario sin desordenarse en la UI? │
│ ¿Cómo responde la API cuando los datos empiezan a crecer? │
└─────────────────────────────────────────
────────────────────┘
🔑 Conceptos Clave
1. Panel Administrativo por Secciones
Cuando un administrador gestiona un negocio, necesita concentrar su atención en tareas
específicas. Mostrar en una misma pantalla grillas para registrar productos, listas de clientes y
cupones de descuento genera distracciones. Dividir el espacio de trabajo en pestañas (Tabs)
permite habilitar un flujo operativo a la vez.
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
2. Paginación
Técnica que consiste en segmentar un conjunto de datos grande en porciones o páginas más
pequeñas. En lugar de retornar un array directo de productos, la API devuelve pequeños
fragmentos (por ejemplo, de o elementos) bajo demanda. Se controla a través de dos
variables:
● page: El número de página actual que se desea visualizar.
● limit: La cantidad máxima de elementos que se permiten en cada porción.
3. Metadata de Paginación
El cliente que consume una API paginada necesita saber en qué parte del conjunto total de
datos se encuentra. Por ello, la API ya no debe retornar un simple array, sino un objeto
enriquecido con variables de navegación.
4. Exportación en Formato CSV (Excel)
El formato CSV (Comma-Separated Values) representa datos tabulares en formato de texto
plano utilizando saltos de línea para las filas y comas (o punto y coma) para delimitar las
columnas. Es ideal en desarrollo por su ligereza y facilidad de implementación, siendo
perfectamente compatible con Microsoft Excel, Google Sheets o sistemas de inteligencia de
negocio (BI).
5. Contrato Consistente de la API
Para evitar la fragilidad en el código frontend, todos los listados del sistema de administración
deben seguir una misma plantilla de respuesta JSON.
{
"items": [],
"pagination": {
"page": 1,
"limit": 10,
"totalItems": 150,
"totalPages": 15,
"hasPreviousPage": false,
"hasNextPage": true
}
}
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida🛠️
Decisiones de Diseño de la Clase
Para lograr un proyecto robusto en esta etapa, aplicamos las siguientes decisiones
arquitectónicas:
✅ Sí separamos el Panel por Pestañas
Rechazamos la idea de apilar todos los CRUDs en una pantalla caótica. Cada sección
(Productos, Categorías, Clientes y Descuentos) comparte un patrón visual homólogo,
facilitando que el administrador comprenda instantáneamente el funcionamiento de toda la
interfaz.
✅ Sí resolvemos la paginación a nivel de Base de Datos
No caemos en la mala práctica de "paginar en el frontend" (traer el array completo desde el
servidor y recortarlo visualmente con JavaScript). En su lugar, el backend asume la
responsabilidad delegando la carga y el recorte físico de filas al motor de base de datos SQL a
través de Sequelize, ahorrando ancho de banda y optimizando la velocidad del servidor.
✅ Sí protegemos de forma estricta los datos administrativos
Los listados completos de Clientes y de Descuentos dejan de estar expuestos
públicamente. Se restringen a los endpoints /api/admin/... bajo los middlewares de
autenticación y rol de administrador. El proceso de checkout del catálogo se rediseña para
que el cliente ingrese su identificador y cupón de manera manual, protegiendo la base de
datos de potenciales fugas de información.
📊 La Matemática detrás de la Paginación
Para comprender cómo Sequelize recorta los datos en la base de datos, debemos calcular el
desplazamiento (offset) de registros. El offset le dice al motor de base de datos cuántas filas
saltar antes de comenzar a retornar los resultados.
La fórmula general para calcular el desplazamiento es:
Ejemplo práctico de cálculo:
Supongamos que el panel administrador solicita la página 3 con un límite de 10 productos por
página:
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
●
●
Aplicamos la fórmula en nuestro servidor:
Esto le indica a nuestra consulta SQL: "Ignora los primeros productos registrados en la
tabla de la base de datos, y retórname los siguientes registros (del al )".
En Sequelize, esto se traduce directamente en la consulta utilizando los parámetros nativos de
configuración:
const pageNum = Number(req.query.page) || 1;
const limitNum = Number(req.query.limit) || 10;
const offsetNum = (pageNum - 1) * limitNum;
const { rows, count } = await Product.findAndCountAll({
limit: limitNum,
offset: offsetNum,
where: whereCondition
});
● findAndCountAll: Es un método sumamente potente de Sequelize. Retorna un objeto
con dos propiedades:
○ count: El número total de registros existentes que coinciden con los criterios (ideal
para calcular la cantidad de páginas).
○ rows: El array de objetos recortado según el limit y offset.
📡 Tabla General de Endpoints del Proyecto
En este Hito 3, nuestro mapa de rutas queda estructurado de la siguiente forma, dividiendo
claramente el consumo público del catálogo de compras de las herramientas administrativas:
🌍 Endpoints Públicos (Disponibles para Clientes y Visitantes)
Método Endpoint Query Parameters Descripción /
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
Comportamiento
GET /api/productos ?categoria=ID&pag
e=1&limit=24
Obtiene el catálogo
de productos
vigentes y filtrados,
paginados por
defecto.
GET /api/productos/:id Ninguno Obtiene el detalle
de un producto
específico (si está
vigente).
GET /api/categorias ?page=1&limit=50 Lista de categorías
disponibles para
alimentar los filtros
de búsqueda.
POST /api/checkout Ninguno Registra la orden de
compra en la base
de datos.
🔒 Endpoints Administrativos (Requieren Token Admin Válido)
Todas las peticiones a estas rutas son interceptadas por los middlewares authenticateToken e
isAdmin en la ruta intermedia /api/admin.
Entidad Método Endpoint Parámetros
permitidos
Acción de
Negocio
Productos GET /api/admin/pro
ductos
?page=1&limit=
10 o
?format=csv
Retorna el
listado
paginado para
el panel o
descarga un
archivo CSV.
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
POST /api/productos (Body JSON) Registra un
nuevo
producto en
catálogo.
PUT /api/productos
/:id
(Body JSON) Modifica los
datos o
vigencia de un
producto
existente.
DELETE /api/productos
/:id
Ninguno Aplica baja
lógica o
eliminación de
un producto.
Categorías GET /api/admin/cat
egorias
?page=1&limit=
10 o
?format=csv
Retorna listado
administrativo
o descarga
CSV de
categorías.
POST /api/categorias (Body JSON) Añade una
nueva
categoría de
productos.
PUT /api/categorias
/:id
(Body JSON) Edita el
nombre o
descripción de
una categoría.
DELETE /api/categorias
/:id
Ninguno Remueve una
categoría del
sistema.
Clientes GET /api/admin/clie
ntes
?page=1&limit=
10 o
?format=csv
Retorna listado
administrativo
o descarga
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
CSV de
clientes.
POST /api/clientes (Body JSON) Registra un
nuevo cliente
con sus datos
fiscales.
PUT /api/clientes/:id (Body JSON) Actualiza la
ficha de
información de
un cliente.
DELETE /api/clientes/:id Ninguno Elimina o
desactiva la
cuenta de un
cliente.
Descuentos GET /api/admin/des
cuentos
?page=1&limit=
10 o
?format=csv
Retorna listado
administrativo
o descarga
CSV de
cupones.
POST /api/descuento
s
(Body JSON) Genera un
nuevo código
de descuento
(porcentaje/m
onto).
PUT /api/descuento
s/:id
(Body JSON) Modifica los
límites o
vigencia de un
cupón.
DELETE /api/descuento
s/:id
Ninguno Inactiva o
elimina un
código de
descuento.
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
📤 Implementación de Exportación de Archivos CSV
La exportación de datos a planillas de cálculo es uno de los requerimientos de negocio más
solicitados en la administración de e-commerce. Para implementarlo de forma sencilla, nuestro
controlador intercepta la consulta cuando se solicita el parámetro ?format=csv:
// Ejemplo de implementación en src/controllers/adminController.js
if (req.query.format === 'csv') {
const clientes = await Client.findAll();
// 1. Definimos las cabeceras de las columnas de la planilla
let csvContent = "ID,Nombre,Email,Telefono,Direccion\n";
// 2. Mapeamos cada fila escapando caracteres especiales o comas internas
clientes.forEach(cliente => {
const row = [
cliente.id,
`"${cliente.name.replace(/"/g, '""')}"`, // Escapa comillas
cliente.email,
cliente.phone || '',
`"${(cliente.address || '').replace(/"/g, '""')}"`
].join(",");
csvContent += row + "\n";
});
// 3. Configuramos los headers de HTTP para forzar la descarga del archivo
res.setHeader('Content-Type', 'text/csv; charset=utf-8');
res.setHeader('Content-Disposition', 'attachment; filename=clientes.csv');
return res.status(200).send(csvContent);
}
¿Por qué esta técnica es sumamente eficiente?
● Cero dependencias: No necesitamos instalar paquetes externos como xlsx o exceljs,
manteniendo nuestro backend sumamente rápido, liviano y seguro.
● Consumo de Memoria Bajo: El servidor procesa cadenas de texto plano y las envía
directamente al cliente.
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
● Compatibilidad Universal: Al abrir el archivo .csv descargado, Excel lo interpretará como
una tabla de datos tradicional ordenando el contenido en filas y columnas de manera
nativa. 🛠️
Arquitectura Limpia: Centralización de Código
(pagination.js)
Para evitar la repetición innecesaria de cálculos matemáticos en todos tus controladores, una
excelente práctica de desarrollo consiste en centralizar la lógica de paginación en un archivo
utilitario común (ubicado en src/utils/pagination.js):
// src/utils/pagination.js
/**
* Procesa los query parameters de Express y calcula los parámetros para Sequelize
*/
const getPaginationParams = (query, defaultLimit = 10) => {
const page = Math.max(1, parseInt(query.page, 10) || 1);
const limit = Math.max(1, parseInt(query.limit, 10) || defaultLimit);
const offset = (page - 1) * limit;
return { page, limit, offset };
};
/**
* Estructura el objeto de respuesta consistente de la API
*/
const buildPaginationMetadata = (count, page, limit, items) => {
const totalPages = Math.ceil(count / limit);
return {
items,
pagination: {
page,
limit,
totalItems: count,
totalPages: totalPages,
hasPreviousPage: page > 1,
hasNextPage: page < totalPages
}
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
};
};
module.exports = {
getPaginationParams,
buildPaginationMetadata
};
Ejemplo de uso en tus controladores de backend:
const { getPaginationParams, buildPaginationMetadata } = require('../utils/pagination');
const getAllProductsAdmin = async (req, res, next) => {
try {
const { page, limit, offset } = getPaginationParams(req.query, 8);
const { rows, count } = await Product.findAndCountAll({
limit,
offset,
include: [{ model: Category, as: 'category' }]
});
const responseData = buildPaginationMetadata(count, page, limit, rows);
res.status(200).json(responseData);
} catch (error) {
next(error);
}
};🖥️
Arquitectura en el Frontend (public/app.js)
Gestión de Estados en la UI Administrativa
En el frontend, el panel administrador no se comporta como una simple página estática. Se
convierte en un sistema reactivo basado en el estado interno de la aplicación. Para evitar que
las peticiones se crucen y actualizar la vista adecuadamente, llevamos un control claro del
estado de navegación activa:
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
// Estado global del panel de administración
const adminState = {
activeTab: 'productos', // 'productos' | 'categorias' | 'clientes' | 'descuentos'
productos: { page: 1, limit: 8 },
categorias: { page: 1, limit: 10 },
clientes: { page: 1, limit: 10 },
descuentos: { page: 1, limit: 10 }
};
// Función para alternar pestañas reduciendo el ruido visual
function switchAdminTab(tabName) {
adminState.activeTab = tabName;
// 1. Alternamos clases visuales de Bootstrap en los botones de navegación
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
if (btn.dataset.tab === tabName) {
btn.classList.add('active', 'btn-primary');
btn.classList.remove('btn-outline-primary');
} else {
btn.classList.remove('active', 'btn-primary');
btn.classList.add('btn-outline-primary');
}
});
// 2. Ocultamos todos los paneles contenedores y revelamos solo el activo
document.querySelectorAll('.admin-tab-content').forEach(panel => {
if (panel.id === `admin-panel-${tabName}`) {
panel.classList.remove('d-none');
} else {
panel.classList.add('d-none');
}
});
// 3. Cargamos los datos paginados de la entidad correspondiente
fetchAdminData();
}
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
Sincronización Post-Mutación (Buenas Prácticas de UX)
Una regla inquebrantable en la experiencia de desarrollo frontend de administración: Toda
acción de edición, creación o eliminación debe refrescar inmediatamente el listado.
Si el administrador hace clic en Eliminar Producto, el cliente debe:
1. Enviar la petición HTTP DELETE /api/productos/:id con la cabecera del token.
2. Esperar la confirmación exitosa del servidor.
3. Disparar nuevamente la función de carga fetchAdminData() en la misma página donde se
encontraba el usuario.
async function deleteProduct(productId) {
if (!confirm("¿Está seguro de que desea eliminar este producto?")) return;
const token = localStorage.getItem('token');
const response = await fetch(`/api/productos/${productId}`, {
method: 'DELETE',
headers: { 'Authorization': `Bearer ${token}` }
});
if (response.ok) {
// Recarga de datos automática sin recargar el navegador
fetchAdminData();
showNotification("Producto eliminado con éxito", "success");
} else {
showNotification("No se pudo realizar la acción", "danger");
}
}
📝 Checklist de Validación de tu Proyecto (HITO 3)
Antes de finalizar la entrega final del cuatrimestre, realiza las siguientes pruebas de calidad
para verificar que todo funcione según lo planeado:
● [ ] Control de Acceso: El panel administrativo y el menú de navegación "Ir a
administración" solo son visibles si has iniciado sesión con un correo de rol admin
(admin@example.com).
● [ ] Visualización Ordenada: En el Panel de Administración se muestra únicamente una
entidad activa a la vez. No hay acumulación vertical de tablas ni formularios encimados.
G O B I E R N O DE LA C I U D A D DE B U E N O S A I R E S
IFTS 16 - Teodoro Garcia 3899. CABA
Agencia de Aprendizaje a lo largo de la vida
● [ ] Ciclo CRUD Completo: Puedes dar de alta, editar y borrar elementos en las 4
entidades operativas (Productos, Categorías, Clientes y Descuentos).
● [ ] Paginación Real: Al hacer peticiones a las rutas de administración, la herramienta de
red del navegador (Network) muestra los parámetros ?page=X&limit=Y en las solicitudes
enviadas.
● [ ] Validación de Metadata: Las respuestas en formato JSON contienen de forma
correcta el listado recortado dentro de la clave "items" y la estructura de navegación en
"pagination".
● [ ] Navegación Fluida: Los botones de Anterior y Siguiente en el frontend se deshabilitan
adecuadamente según las banderas booleanas hasPreviousPage y hasNextPage
devueltas por la API.
● [ ] Descarga Operativa: Al hacer clic en el botón "Bajar Excel/CSV", el navegador
descarga de manera automática un archivo .csv con la estructura correspondiente a la
sección activa.
● [ ] Blindaje de Información: Si realizas una petición GET desde la terminal o Postman a
/api/clientes o /api/descuentos sin un token, el backend responde de inmediato con
código 401 o 403. No hay listados sensibles expuestos al público.
❓ Preguntas de Autoevaluación
1. ¿Qué ventajas de rendimiento tiene realizar la paginación a nivel de la base de datos SQL
con Sequelize en lugar de realizarla con arreglos directamente en JavaScript en el
frontend?
2. Explica matemáticamente qué significa que el offset calculado por tu servidor sea igual a
si tienes un límite de registros por página.
3. ¿Por qué es una mala práctica de diseño exponer el listado completo de clientes y
códigos de descuento como rutas públicas sin protección de autenticación?
4. Si cambias el nombre de una categoría que ya está asociada a varios productos antiguos,
¿qué comportamiento de base de datos deberías esperar en Sequelize?
5. ¿Qué beneficio técnico y humano aporta centralizar la lógica de formateo y validación de
parámetros en el archivo común src/utils/pagination.js?
📚 Enlaces y Referencias de Estudio
● Sequelize ORM - Operaciones de Consulta y Limit/Offset (Inglés)
● Express JS - Creación de Routers Modulares y Agrupados
● RFC 4180 - Especificaciones técnicas y estándares del formato de archivo CSV
● MDN Web Docs - Cabecera Content-Disposition para descargas de archivos