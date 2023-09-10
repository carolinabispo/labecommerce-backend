import { users,products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";
import { TProducts } from "./types";
// console.log("projeto rodando");

console.log( users)
console.log(products);

//-------------------------------criando um novo usuario--------------------------- 
const creatUserResult:string = createUser("u003", "Laércio", "laercio@email.com", "laercio123456")

console.log(creatUserResult)

// //imprimindo a lista de usuarios 
const userList = getAllUsers()
console.log(userList)


//------------------------------criando novo produto-----------------------------
const creatProductResult:string = createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo")

console.log(creatProductResult)

const productsList: TProducts[] = getAllProducts()
console.log(productsList)


//------------------------------procurar por nome-------------------------------
const searchResult: TProducts[] = searchProductsByName("gamer");
console.log(searchResult);
