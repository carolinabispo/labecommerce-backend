import { TProducts, TUsers } from "./types";

 export const users:TUsers[] =[
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
 ]




export const products: TProducts[] = [{
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
] 



//---------------------------função para criar um novo usuario---------------------------
export function createUser(id: string, name: string, email: string, password: string): string {

  const createdAt: string = new Date().toISOString();
  const newUser: TUsers = { id, name, email, password, createdAt };
  users.push(newUser);
  return "Cadastro realizado com sucesso";
}

//função para retornar todos os usuarios ja existentes
export function getAllUsers(): TUsers[] {
  return users;
}

//------------------------função para criar um novo produto--------------------------
export function createProduct(id: string, name: string, price: number,description: string,imageUrl: string): string {

  const newProduct: TProducts = { id, name, price, description, imageUrl };
  products.push(newProduct);
  

  return "Produto cadastrado com sucesso";
}

//função para retornar todos os produtos da lista de produtos
export function getAllProducts(): TProducts[] {
  return products;
}


//-----------------------função para procurar por nome-------------------------------
export function searchProductsByName(name: string): TProducts[] {
  const searchTerm = name.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
  return filteredProducts;
}


