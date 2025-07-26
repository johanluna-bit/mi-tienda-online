const request = require('supertest');
const { app, server } = require('../server'); // Importamos la app y el server

// Hook para cerrar el servidor después de todas las pruebas
afterAll((done) => {
  server.close(done);
});

describe('API de Productos - CRUD', () => {

  it('GET /api/products -> debería obtener todos los productos', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('POST /api/products -> debería crear un nuevo producto', async () => {
    const newProduct = { name: 'Monitor 4K', price: 450 };
    const response = await request(app)
      .post('/api/products')
      .send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.price).toBe(newProduct.price);
  });

  it('GET /api/products/1 -> debería obtener un producto por su ID', async () => {
    const response = await request(app).get('/api/products/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('PUT /api/products/1 -> debería actualizar un producto', async () => {
    const updatedData = { price: 1250 };
    const response = await request(app)
      .put('/api/products/1')
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.price).toBe(1250);
  });

  it('DELETE /api/products/2 -> debería eliminar un producto', async () => {
    const response = await request(app).delete('/api/products/2');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Producto eliminado exitosamente');

    // Verificamos que ya no existe
    const verifyResponse = await request(app).get('/api/products/2');
    expect(verifyResponse.statusCode).toBe(404);
  });
});