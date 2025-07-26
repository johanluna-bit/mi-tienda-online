const express = require('express');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/products', productRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de mi tienda online!');
});

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

// Exportar app y server para pruebas
module.exports = { app, server };