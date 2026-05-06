const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const productosDB = [
  {
    id: 1,
    nombre: "Smartphone X-1",
    precio: 85000,
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    descripcion: "Pantalla AMOLED 120Hz · Cámara cuádruple 200MP · Batería 5000mAh",
    badge: "10% OFF · Edición Limitada",
    tipoBadge: "badge-descuento"
  },
  {
    id: 2,
    nombre: "Laptop Pro Max",
    precio: 450000,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    descripcion: "Procesador M3 Ultra · 32GB RAM · SSD 1TB · Pantalla Retina 4K",
    badge: "Envío gratis · Elite",
    tipoBadge: "badge-envio"
  },
  {
    id: 3,
    nombre: "Audio Ultra G",
    precio: 25000,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    descripcion: "Cancelación activa de ruido · 40hs autonomía · Driver de 40mm",
    badge: "Nueva generación · Studio",
    tipoBadge: "badge-nuevo"
  }
];

app.get('/api/productos', (req, res) => {
  res.json(productosDB);
});

app.post('/api/checkout', (req, res) => {
  const carritoRecibido = req.body;

  console.log("Nueva compra recibida:");
  console.log(carritoRecibido);

  res.json({
    mensaje: "Ticket generado con éxito, gracias por su compra"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});