"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: 'u001',
        name: "Fulano",
        email: "fulano@email.com",
        password: 'fulano123',
        createdAt: new Date().toISOString()
    },
    {
        id: 'u002',
        name: "Beltrana",
        email: "beltrana@email.com",
        password: 'beltrana00',
        createdAt: new Date().toISOString()
    }
];
exports.products = [{
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 250,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    }
];
function createUser(id, name, email, password) {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso";
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    return "Produto cadastrado com sucesso";
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function searchProductsByName(name) {
    const searchTerm = name.toLowerCase();
    const filteredProducts = exports.products.filter((product) => product.name.toLowerCase().includes(searchTerm));
    return filteredProducts;
}
exports.searchProductsByName = searchProductsByName;
