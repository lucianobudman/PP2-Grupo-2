# Clase 7: TEORÍA Persistencia real y Seguridad (ORM + .env)

0. ¿ORM?¿.env?

1. ¿Que queremos hacer esta Clase?
2. ¿Como lo haríamos?


## ¿ORM?¿.env?

- ORM:    --> Uso POO para escribir SQL
- .env:   --> ESCONDE la info: saca info sesible fuera del codigo, evita subirla a GitHub. Esta dentro del .gitignore


## Definiciones
- Persistencia real --> guardar en archivo, no en ram
- ORM --> Uso POO para escribir SQL
- Post-its --> (en este contexto)
Es una metáfora para los arrays en memoria
- SQLite --> Motor de BDD que guarda todo en un único archivo .sqlite en el disco. No requiere instalar Servidor separado.
- Sequelize --> Es un ORM para Node.js.
- BDD Relacional --> usa SQL para organizar datos en tablas, con filas y columnas

## Estructura de las carpetas

+.env, src/config, src/models

- /mi-proyecto
- ├── /public              🌐 VISTAS (Frontend)
- ├── /src                 ⚙️ BACKEND
- │   ├── /config          🆕 Conexión a la Base de Datos
- │   ├── /models          🆕 Definición de las Tablas
- │   ├── /routes          🚦 Porteros (Mapean URLs)
- │   └── /controllers     👨‍🍳 Chefs (Lógica de Negocio)
- ├── .env                 🔐 LA CAJA FUERTE
- ├── server.js            🎼 Director
- └── package.json         📜 Lista de Compras del proyecto

# PRÁCTICA

## 1. Crear .env (Caja fuerte)
### "Este archivo ESCONDE la info: saca info sensible fuera del codigo, evita subirla a GitHub. Esta dentro del .gitignore"
+ Instalacion de package.json (npm install sequelize sqlite3 dotenv)
+ Crear archivo .env en raiz del proyecto (=server)
+ Agregar a .env (PORT=3000 
DB_DIALECT=sqlite 
DB_STORAGE=./ecommerce.sqlite)
+ Verifica que .env y *.sqlite estén anotados dentro de tu archivo .gitignore 
antes de hacer tu próximo commit

## 2. Crear src/config/database.js (La Conexión)

### "Crea este archivo. Usaremos process.env para leer los datos del .env en lugar de escribirlos a mano."

const { Sequelize } = require('sequelize');  

require('dotenv').config(); // Abre la caja fuerte del .env  

// Configuramos Sequelize leyendo las variables de entorno  

const sequelize = new Sequelize({  

dialect: process.env.DB_DIALECT,  

storage: process.env.DB_STORAGE    

});  

module.exports = sequelize;

## 3. Crea src/models/Producto.js (El "Modelo")

### "El Modelo es el "molde" de nuestra tabla. Reemplaza a las clases JS que hicimos en la Clase 3."

### ver paso C: Rompe las bolas copiar y pegar esto


## 4. Actualizamos Controller

### "Actualizamos cada controlador. Cada uno debe elejir un controlador y modificarlo"

#### Ver punto 5: no voy a copiar y pegar, pero se tiene que seguir la misma fórmula

### ¿Como se actualiza el controlador? (3 pasos)
+ Importar Modelo Sequelize (linea 1)
+ Determinar xxxxxxxController y sus acciones
+ moduleExports = xxxxxxxController
### Acciones de Controlador (5 acciones)
+ getAll → usa Producto.findAll() para traer todos los productos
+ getById → usa Producto.findByPk(id) para buscar por ID
+ create → usa Producto.create(req.body) para insertar un nuevo registro
+ update → usa Producto.update(datos, { where: { id } }) para modificar un registro existente
+ delete → usa Producto.destroy({ where: { id } }) para eliminar un registro

### Nota: Cada función es async y está envuelta en try/catch para manejar errores

# Duda

cierra la caja fuerte