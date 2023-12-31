


Esta é uma aplicação para criação, edição e exclusão de produtos, pedidos e usúarios simples construída com Express.js e o query builder Knex.js sendo utilizado typescript. Ela inclui endpoints para gerenciar usuários, produtos e compras em um banco de dados.



1. Clone o repositório em sua máquina local.

2. Instale as dependências necessárias:
   ```bash
   npm install
   ```
Configure seu banco de dados: Certifique-se de ter um sistema de banco de dados (por exemplo, PostgreSQL, MySQL no repositório em questão foi usado SQLite) em execução e configure a conexão no arquivo knexfile.ts.


Inicie o servidor Express:
```
npm run dev
```
O servidor deve estar em execução em http://localhost:3003.

endpoints da API
Obter Todos os Usuários: Obtenha uma lista de todos os usuários.


--Acessar todos usuários
endpoint: GET /users
![](./assets/get%20all%20users.png)




--Criar Usuário: Crie um novo usuário.
endpoint: POST /users
![](./assets/create_user.png)
![](./assets/create_user2.png)



--Obter Todos os Produtos: Obtenha uma lista de todos os produtos.
endpoint: GET /products
![](./assets/img%203.png)
![](./assets/img_3.png)





--Criar Produto: Crie um novo produto.
endpoint: POST /products
![](./assets/create%20product.png)
![](./assets/create_product.png)





--Excluir Produto por ID: Exclua um produto pelo seu ID.
endpoint: DELETE /products/:id
![](./assets/delete%20product.png)
![](./assets/delete_product.png)



--Obter Todas as Compras: Obtenha uma lista de todas as compras.
endpoint: GET /allpurchase

![](./assets/get%20purchases.png)


--Criar Compra: Crie uma nova compra.
endpoint: POST /purchases
![](./assets/create%20purchase.png)

--Obter Compra por ID: Obtenha informações de compra pelo seu ID.
endpoint: GET /purchases/:id

![](./assets/purchase%20id.png)

--Filtrar Produtos por Nome: Filtre produtos pelo nome.
endpoint: GET /products/search?q={nome_do_produto}
![](./assets/filter%20name.png)


--Atualizar Produto por ID: Atualize as informações de um produto pelo seu ID.
endpoint: PUT /products/:id
![](./assets/edit%20product.png)

Exemplo de Uso
Para criar um novo usuário, envie uma solicitação POST para /users com um corpo JSON contendo as informações do usuário.

Para criar um novo produto, envie uma solicitação POST para /products com um corpo JSON contendo as informações do produto.

Para atualizar um produto, envie uma solicitação PUT para /products/:id com um corpo JSON contendo as informações atualizadas do produto.

Para filtrar produtos pelo nome, envie uma solicitação GET para /products/search?q={nome_do_produto}.

Para obter mais detalhes sobre os endpoints disponíveis, consulte o código.

Tratamento de Erros
A aplicação inclui tratamento de erros para solicitações inválidas e operações no banco de dados. Erros são retornados com códigos de status apropriados e mensagens de erro.


Todos direitos reservados a Carolina Ap. S. Bispo dos Santos





