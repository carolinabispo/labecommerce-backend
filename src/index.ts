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
import { error, log } from "console";

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
    // const resultUsers = await db.raw(`SELECT * FROM users`);

    // res.status(200).send(resultUsers);
    const result = await db.select("*").from("users");
    res.status(200).send(result);
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
    // const resultProducts = await db.raw(`SELECT * FROM products`);
    // res.status(200).send(resultProducts);

    const result = await db.select("*").from("products");
    res.status(200).send(result);
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

    // const newUser = await db.raw(`INSERT INTO users
    // VALUES('${id}','${name}','${email}','${password}',datetime('now'))`);

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
    };
    await db("users").insert(newUser);

    const [isID] = await db.raw(`SELECT id FROM users WHERE id ="${id}"`);

    if (!isID) {
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
    const { id, name, price, description, image_url } = req.body;

    //     const newProduct = await db.raw(`INSERT INTO products
    // VALUES('${id}','${name}','${price}','${description}','${imageUrl}')`);

    //     res.status(200).send({ message: "Produto cadastrado com sucesso" });

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
    if (typeof image_url !== "string") {
      res.statusCode = 404;
      throw new Error("Url de imagem invalida");
    }

    // products.push(newProduct);

    const newProduct = { id, name, price, description, image_url };

    await db("products").insert(newProduct);
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
    // const resultPurchases = await db.raw(`SELECT * FROM purchases`);
    const resultPurchases = await db.select("*").from("purchases");
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
    const { id, buyer_id, total_price, product_id, product_description } =
      req.body;

    //console.log("@===>>>", id, buyer_id, total_price);

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

    const newPurchase = {
      id: id,
      buyer_id: buyer_id,
      total_price: total_price,
      product_id: product_id,
      product_description: product_description,
    };

    await db("purchases").insert(newPurchase);
    // await db.raw(`INSERT INTO purchases
    // (id, buyer_id, total_price,product_id, product_description)
    // VALUES('${id}','${buyer_id}','${total_price},'${product_id},'${product_description}')`);

    res.status(200).send("Pedido cadastrado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

//-----------------------get purchase by id --------------------------
app.get("/purchases/:id", async (req, res) => {
  try {
    const purchaseById = req.params.id; 
  

    if (!purchaseById) {
      res.status(404);
      throw new Error("Id não encontrado");
    }

    const [purchaseInfo] = await db("purchases")
      .select(
        "purchases.id as purchaseId",
        "users.id as buyerId",
        "users.name as buyerName",
        "users.email as buyerEmail",
        "purchases.total_price as totalPrice",
        "purchases.created_at as createdAt"
      )
      .innerJoin("users", "purchases.buyer_id", "=", "users.id")
      .where({ "purchases.id": purchaseById });

    const resultProducts = await db("purchases_products")
      .select(
        "id as idProduct",
        "name as nameProduct",
        "price as priceProduct",
        "description as descriptionProduct",
        "image_url as imageUrlProducts",
        "quantity as qtnd"
      )
      .innerJoin(
        "products",
        "purchases_products.product_id",
        "=",
        "products.id"
      )
      .where({ "purchases_products.purchase_id": purchaseById });

    const newResult = {
      ...purchaseInfo,
      products: resultProducts,
    };

    res.status(200).send(newResult);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error: The query must contain at least one character.");
    }
  }
})
//------------ função de deletar usuario -------------------

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [users] = await db("users").where({ id: idToDelete });

    if (!users) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }
    await db("users").del().where({ id: idToDelete });

    res.status(200).send({ message: "User deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

//----------------------deletar purchase by id -----------------------------

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [purchase] = await db("purchases").where({ id: idToDelete });

    if (!purchase) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }
    await db("purchases").del().where({ id: idToDelete });

    res.status(200).send({ message: "Pedido  deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

//--------------- função de deletar product -----------------
app.delete("/products/:id", async (req: Request, res: Response) => {
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

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
  
    const newId = req.body.id;
    const newProductName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageUrl = req.body.image;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
      if (newId.length < 3) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 3 caractere");
      }
    }

    if (newProductName !== undefined) {
      if (typeof newProductName !== "string") {
        res.status(400);
        throw new Error("'Nome do produto' deve ser string");
      }

      if (newProductName.length < 2) {
        res.status(400);
        throw new Error(
          "'Nome do produto' deve possuir no mínimo 2 caracteres"
        );
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error("'Descrição do produto' deve ser uma string");
      }
      if (newDescription.length < 5) {
        res.status(400);
        throw new Error(
          "'Descrição do produto' deve possuir no mínimo 5 caracteres"
        );
      }
    }

    if (newImageUrl !== undefined) {
      if (typeof newImageUrl !== "string") {
        res.status(400);
        throw new Error("'URL do produto' deve ser uma string");
      }
      if (newImageUrl.length < 5) {
        res.status(400);
        throw new Error("'URL do produto' deve possuir no mínimo 5 caracteres");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'Preço' deve ser number");
      }

      if (newPrice < 0) {
        res.status(400);
        throw new Error("'Preço' não pode ser negativo");
      }
    }

    const [product] = await db("products").where({ id: id });

    if (product) {
      const updatedProduct = {
        id: newId || product.id,
        name: newProductName || product.name,
        price: isNaN(newPrice) ? product.price : newPrice,
        description: newDescription || product.description,
        image_url: newImageUrl || product.image,
      };
      await db("products").update(updatedProduct).where({ id: id });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
   
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
