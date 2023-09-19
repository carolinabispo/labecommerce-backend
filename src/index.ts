import {
  users,
  products,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
} from "./database";
import { TProducts, TUsers } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

console.log(users);
console.log(products);

//-------------------------------criando um novo usuario---------------------------
const creatUserResult: string = createUser(
  "u003",
  "Laércio",
  "laercio@email.com",
  "laercio123456"
);

console.log(creatUserResult);

// //imprimindo a lista de usuarios
const userList = getAllUsers();
console.log(userList);

//------------------------------criando novo produto-----------------------------
const creatProductResult: string = createProduct(
  "prod003",
  "SSD gamer",
  349.99,
  "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  "https://images.unsplash.com/photo"
);

console.log(creatProductResult);

const productsList: TProducts[] = getAllProducts();
console.log(productsList);

//------------------------------procurar por nome-------------------------------
const searchResult: TProducts[] = searchProductsByName("gamer");
console.log(searchResult);

// ----------------------------criação de endpoints get all users e products---------------------------
app.get("/users", (req: Request, res: Response) => {
  const resultUsers: TUsers[] = users;
  res.status(200).send(resultUsers);
});

app.get("/products", (req: Request, res: Response) => {
  const resultProducts: TProducts[] = products;
  res.status(200).send(resultProducts);
});

//--------------- filtrar endpoint por nome------------------

app.get("/products/search", (req: Request, res: Response) => {
  const query: string = req.query.q as string;
  const productsByName: TProducts[] = products.filter(
    (product) => product.name.toLowerCase() === query.toLowerCase()
  );

  //   retorna todos os produtos caso query params chegue undefined
  if (!productsByName.length) {
    res.status(200).send(products);
  } else {
    res.status(200).send(productsByName);
  }
});

// -----------------criar novo user e products----------------

app.post("/users", (req: Request, res: Response) => {
  const { id, name, email, password }: TUsers = req.body;
  const newUser: TUsers = {
    id,
    name,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).send("Usuário criado com sucesso");
});

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl }: TProducts = req.body;
  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso");
});

//------------ função de deletar usuario -------------------

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexToDelete = users.findIndex((user) => user.id === id);
  if (indexToDelete >= 0) {
    users.splice(indexToDelete, 1);
  } else {
    console.log("deu ruim, nao deletou nada");
  }
  res.status(200).send({ message: "User apagado com sucesso!" });
});

//--------------- função de deletar product -----------------
app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexToDelete = products.findIndex((product) => product.id === id);
  if (indexToDelete >= 0) {
    products.splice(indexToDelete, 1);
  } else {
    console.log("deu ruim, nao deletou nada");
  }
  res.status(200).send({ message: "Produto apagado com sucesso!" });
});

//---------- função para editar product -----------------

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const newId = req.body.id as string | undefined;
  const newProductName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imahge as string | undefined;

  const newProduct = products.find((item) => item.id === id);

  if (newProduct) {
    newProduct.id = newId || newProduct.id;
    newProduct.name = newProductName || newProduct.name;
    newProduct.price = newPrice || newProduct.price;
    newProduct.imageUrl = newImageUrl || newProduct.imageUrl;
    newProduct.description = newDescription || newProduct.description;
  }

  res.status(200).send({ message: "alteração feita com sucesso" });
});
