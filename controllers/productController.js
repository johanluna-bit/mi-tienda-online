// Usamos un array en memoria como nuestra "base de datos" temporal
let products = [
  { id: 1, name: 'Laptop Pro', price: 1200 },
  { id: 2, name: 'Teclado Mecánico', price: 150 },
  { id: 3, name: 'Mouse Gamer', price: 75 },
  { id: 4, name: 'Pantalla Gamer', price: 300 },
  { id: 5, name: 'Silla Gamer', price: 400 },
  { id: 6, name: 'Pantalla LCD', price: 600 },
  
];
let nextId = 4;

// OBTENER TODOS los productos (Read)
exports.getAllProducts = (req, res) => {
  res.status(200).json(products);
};

// OBTENER UN producto por ID (Read)
exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  res.status(200).json(product);
};

// CREAR un nuevo producto (Create)
exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'El nombre y el precio son requeridos' });
  }
  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price)
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// ACTUALIZAR un producto existente (Update)
exports.updateProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  const updatedProduct = { ...products[productIndex], ...req.body };
  products[productIndex] = updatedProduct;
  res.status(200).json(updatedProduct);
};

// ELIMINAR un producto (Delete)
exports.deleteProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  products.splice(productIndex, 1);
  res.status(200).json({ message: 'Producto eliminado exitosamente' });
};