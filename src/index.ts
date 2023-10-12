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
import { db } from "./database/knex";
import knex, { QueryBuilder } from "knex";
import { error } from "console";

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
app.get("/users", async (req: Request, res: Response) => {
  try {
    // const resultUsers: TUsers[] = users;
    const resultUsers = await db.raw(`SELECT * FROM users`);

    res.status(200).send(resultUsers);
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    // const resultProducts: TProducts[] = products;
    //refatorando com uso do db do knex
    const resultProducts = await db.raw(`SELECT * FROM products`);
    res.status(200).send(resultProducts);
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//--------------- filtrar endpoint por nome------------------

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const query: string = req.query.q as string;

    if (query.length === 0) {
      res.statusCode = 404;
      throw new Error("Query deve possuir pelo menos um caractere");
    }
    //refatorando com uso do db do knex

    const productsByName = await db("products").where(
      "name",
      "like",
      `%${query}%`
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

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    // res.status(200).send({message:"Usuário cadastrado com succeso"})

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

    // const existingUserById: TUsers | undefined = users.find(
    //   (user) => user.id === id
    // );
    // const existingUserByEmail: TUsers | undefined = users.find(
    //   (user) => user.email === email
    // );

    // if (existingUserById) {
    //   res.statusCode = 400;
    //   throw new Error("Já existe um usuário com o mesmo ID.");
    // }

    // if (existingUserByEmail) {
    //   res.statusCode = 400;
    //   throw new Error("Já existe um usuário com o mesmo e-mail.");
    // }

    // users.push(newUser);

    // const [isID] = await db.raw(`SELECT id FROM users WHERE id ="${id}"`);

    // if (isID) {
    //   //nao posso cadastrar
    //   res.status(400)
    //   throw new Error ('Id invalido')
    // } else {
    //   //posso cadastrar
    //   await db.raw(
    //     `INSERT INTO users
    //   VALUES('${id}','${name}','${email},'${password}',datetime('now'))`);

    //   res.status(200).send('Usuario cadastrado com sucesso')
    // }

    const newUser = await db.raw(`INSERT INTO users
    VALUES('${id}','${name}','${email}','${password}',datetime('now'))`);

    const [isID] = await db.raw(`SELECT id FROM users WHERE id ="${id}"`);

    if (isID && isID.length > 0) {
      res.status(400);
      throw new Error("id invalido");
    } else {
      newUser;

      res.status(201).send("Usuário criado com sucesso");
    }

    // res.status(201).send("Usuário criado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//----------------------criando novo poroduto----------------------------

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    const newProduct = await db.raw(`INSERT INTO products
VALUES('${id}','${name}','${price}','${description}','${imageUrl}')`);

    res.status(200).send({ message: "Produto cadastrado com sucesso" });

    // const newProduct: TProducts = {
    //   id,
    //   name,
    //   price,
    //   description,
    //   imageUrl,
    // };

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

//--------------------- get all purchases ----------------------
app.get("/allpurchase", async (req: Request, res: Response) => {
  try {
    const resultPurchases = await db.raw(`SELECT * FROM purchases`);
    res.status(200).send(resultPurchases);
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//-------------------create purchase --------------------------

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer_id, total_price } = req.body;

    console.log("@===>>>", id, buyer_id, total_price);

    if (typeof id !== "string" || id.length < 4) {
      res.statusCode = 404;
      throw new Error("O campo do 'id' é obrigatório");
    }

    if (typeof buyer_id !== "string" || buyer_id.length < 3) {
      res.statusCode = 404;
      throw new Error("O campo do 'buyer id' é obrigatório");
    }

    if (typeof total_price !== "number" || total_price <= 1) {
      res.statusCode = 404;
      throw new Error("O campo do 'preço' é obrigatório");
    }

    await db.raw(`INSERT INTO purchases
    (id, buyer_id, total_price)
    VALUES("${id}", "${buyer_id}", "${total_price}")`);

    res.status(200).send("Produto cadastrado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

//------------ função de deletar usuario -------------------

app.delete("/users/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id

    const [users] = await db("users").where({id:idToDelete})

 if (!users) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }
await db("users").del().where({ id: idToDelete })

        res.status(200).send({ message: "User deletado com sucesso" })
				//-------------------------TA TUDO ERRAAADDDOOOOOOOOOOOOOOOOOOOOOOOOOOO------------



    
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});


//--------------- função de deletar product -----------------
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const indexToDelete: number = products.findIndex(
      (product) => product.id === id
    );
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

    const newProduct: TProducts | undefined = products.find(
      (item) => item.id === id
    );

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
