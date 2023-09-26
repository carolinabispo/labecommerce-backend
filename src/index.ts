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
  try {
    const resultUsers: TUsers[] = users;
    res.status(200).send(resultUsers);
  } catch (error) {
    res.status(500).send("erro inesperado");
  }
});

app.get("/products", (req: Request, res: Response) => {
  try {
    const resultProducts: TProducts[] = products;
    res.status(200).send(resultProducts);
  } catch (error) {
    res.status(500).send("erro inesperado");
  }
});

//--------------- filtrar endpoint por nome------------------

app.get("/products/search", (req: Request, res: Response) => {
  try {
    const query: string = req.query.q as string;

    if (query.length === 0) {
      res.statusCode = 404;
      throw new Error("Query deve possuir pelo menos um caractere");
    }

    const productsByName: TProducts[] = products.filter((product) =>
      product.name.toLowerCase().startsWith(query.toLowerCase())
    );

    if (productsByName.length === 0) {
      res.statusCode = 404;
      throw new Error(`Nenhum produto encontrado para a query ${query}`);
    }

    res.status(200).send(productsByName);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro: a query deve possuir pelo menos um caractere");
    }
  }
});

// -----------------criar novo user e products----------------

app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, name, email, password }: TUsers = req.body;
    const newUser: TUsers = {
      id,
      name,
      email,
      password,
    };

    if (typeof id !== "string") {
      res.statusCode = 404;
      throw new Error("ID invalido");
    }

    if (name.length < 3) {
      res.statusCode = 404;
      throw new Error("Nome de usuário deve possuir pelo menos 3 caracteres");
    }

    if (typeof name !== "string") {
      res.statusCode = 404;
      throw new Error("Nome de usuário invalido");
    }

    if (typeof email !== "string") {
      res.statusCode = 404;
      throw new Error("Email invalido");
    }

    if (typeof password !== "string") {
      res.statusCode = 404;
      throw new Error("Senha invalida");
    }

    const existingUserById:TUsers | undefined = users.find((user) => user.id === id);
    const existingUserByEmail:TUsers | undefined = users.find((user) => user.email === email);

    if (existingUserById) {
      res.statusCode = 400;
      throw new Error("Já existe um usuário com o mesmo ID.");
    }

    if (existingUserByEmail) {
      res.statusCode = 400;
      throw new Error("Já existe um usuário com o mesmo e-mail.");
    }

    users.push(newUser);
    res.status(201).send("Usuário criado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl }: TProducts = req.body;
    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    if (typeof id !== "string") {
      res.statusCode = 404;
      throw new Error("ID invalido");
    }
    if (typeof name !== "string") {
      res.statusCode = 404;
      throw new Error("Nome de produto invalido");
    }
    if (typeof price !== "number") {
      res.statusCode = 404;
      throw new Error("Preço de produto invalido");
    }
    if (typeof description !== "string") {
      res.statusCode = 404;
      throw new Error("Descrição de produto invalida");
    }
    if (typeof imageUrl !== "string") {
      res.statusCode = 404;
      throw new Error("Url de imagem invalida");
    }

    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//------------ função de deletar usuario -------------------

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const indexToDelete:number = users.findIndex((user) => user.id === id);
    if (indexToDelete >= 0) {
      users.splice(indexToDelete, 1);
      res.status(200).send({ message: "User apagado com sucesso!" });
    } else {
      res.status(404).send({ message: "Usuário não encontrado" });
    }
    // res.status(200).send({ message: "User apagado com sucesso!" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//--------------- função de deletar product -----------------
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const indexToDelete:number = products.findIndex((product) => product.id === id);
    if (indexToDelete >= 0) {
      products.splice(indexToDelete, 1);
      res.status(200).send({ message: "Produto apagado com sucesso" });
    } else {
      res.status(404).send({ message: "Produto não encontrado" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//---------- função para editar product -----------------

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const newId = req.body.id as string | undefined;
    const newProductName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imahge as string | undefined;

    const newProduct:TProducts | undefined = products.find((item) => item.id === id);

    if (newProduct?.id !== id) {
      res.status(404).send({ message: "Produto não encontrado " });
    }

    if (newProduct) {
      newProduct.id = newId || newProduct.id;
      newProduct.name = newProductName || newProduct.name;
      newProduct.price = newPrice || newProduct.price;
      newProduct.imageUrl = newImageUrl || newProduct.imageUrl;
      newProduct.description = newDescription || newProduct.description;
    }

    res.status(200).send({ message: "alteração feita com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }

});
