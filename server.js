// server.js - El motor de nuestra aplicación 
const express = require('express'); 
const app = express(); 
const PORT = 3000; 
// Le decimos al servidor que exponga públicamente los archivos de la carpeta "public" 
app.use(express.static('public')); 
// Encendemos el servidor 
app.listen(PORT, () => { 
console.log(`✅ Servidor corriendo en http://localhost:${PORT}`); 
});