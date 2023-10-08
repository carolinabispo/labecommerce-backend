-- Active: 1695689491404@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

DROP TABLE users

SELECT * FROM users 

INSERT INTO
    users(
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Luna',
        'luna@email.com',
        'luna123',
        datetime('now')
    ),(
        'u002',
        'Breno',
        'breno@email.com',
        'breno',
        datetime('now')
    ),(
        'u003',
        'Laercio',
        'laercio@email.com',
        'laercio',
        datetime('now')
    ), (
        'u004',
        'Lyandra',
        'lyandra@email.com',
        'lyandra123',
        datetime('now')
    );


--  -------------------------- criando produtos

CREATE TABLE
    products (
        id TEXT PRIMARY KEY NOT NULL UNIQUE,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

DROP Table products

SELECT * FROM products 

INSERT  INTO products (id,name,price,description,image_url) 
VALUES('prod001','Iphone 14 pro max',9500,'Uma nova forma de interação no iPhone.','https://images.kabum.com.br/produtos/fotos/393973/iphone-14-pro-max-512gb-preto-espacial-tela-6-7-camera-tripla-12mp-selfie-12mp-mqaf3be-a_1666098428_gg.jpg');

INSERT  INTO products (id,name,price,description,image_url)  VALUES('prod002','Processador AMD Ryzen 5 4600G',630,'Com os processadores AMD Ryzen para desktop, você está sempre na frente.','https://images.kabum.com.br/produtos/fotos/333145/processador-amd-ryzen-5-4600g-cache-11mb-3-7ghz-4-2ghz-max-turbo-am4-video-integrado-100-100000147box_1653338731_gg.jpg');

INSERT  INTO products (id,name,price,description,image_url)  VALUES('prod003','Placa de Vídeo gamer RTX 3060 Ventus 2X MSI NVIDIA GeForce',1700,'Jogue os jogos mais recentes usando o poder da Ampere — a arquitetura RTX de 2ª geração da NVIDIA','https://images.kabum.com.br/produtos/fotos/384627/placa-de-video-msi-nvidia-geforce-rtx-3060-ventus-2x-12gb-gddr6-dlss-ray-tracing-912-v397-272_1663850312_gg.jpg');


INSERT  INTO products (id,name,price,description,image_url)  VALUES('prod004','Roteador Tp-Link Archer C50w Wisp Preset',150,'o roteador tp-link archer c50w é a escolha ideal para quem busca uma conexão wi-fi de alta velocidade e desempenho confiável','https://images.kabum.com.br/produtos/fotos/sync_mirakl/485613/Roteador-Tp-Link-Archer-C50w-Wisp-Preset-Ac1200-Dual-Band-4-Antenas-V-6-8-_1694459323_gg.jpg');


INSERT  INTO products (id,name,price,description,image_url)  VALUES('prod005','Cooler Processador Deepcool Gammaxx Ag400',210,'Ag400 bk argbo deepcool ag400 bk argb é um cooler de cpu de torre única de 120 mm que se baseia em nosso legado para desempenho de resfriamento de alta qualidade, mas simplificado para um pacote simplificado e eficiente.','https://images.kabum.com.br/produtos/fotos/sync_mirakl/483368/Cooler-Processador-Deepcool-Gammaxx-Ag400-ARGB-120mm-Preto_1694452090_gg.jpg');



SELECT * FROM products WHERE name LIKE '%gamer%'

-- DELETE from users WHERE id = 'u005';

-- DELETE from products WHERE id = 'prod005';

-- UPDATE products SET name = '***********',
-- price = 600,
-- description ='descrição do produto 6',
-- image_url = 'novaimg.url'
-- WHERE id ='prod006'


--criando tabela de pedidos

CREATE TABLE 
    purchases (
        purchase_id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        buyer_id TEXT UNIQUE NOT NULL,
        Foreign Key (buyer_id) REFERENCES users(id)
            ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
            ON DELETE CASCADE
    );

DROP TABLE purchases;

SELECT * FROM purchases;

INSERT INTO purchases VALUES
 ('pur001','Breno', 500, datetime ('now'),'u001'),
 ('pur002','Luna', 600, datetime('now'),'u002'),
 ('pur003','Laercio', 400, datetime('now'),'u003');



 UPDATE purchases
 SET total_price = 800 WHERE buyer_id = 'u001';

-- junção das tabelas

SELECT * FROM purchases INNER JOIN users

SELECT * FROM users INNER JOIN purchases ON purchases.buyer_id = users.id

SELECT purchases.purchase_id, purchases.buyer_id, purchases.buyer, users.email, users.id,purchases.total_price, purchases.created_at FROM purchases
INNER JOIN users on users.id = purchases.buyer_id

--tabela de relação entre purchase e products
 CREATE TABLE  purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL ,
    FOREIGN KEY (product_id) REFERENCES products(id),  -- Adicione uma vírgula aqui
    FOREIGN KEY (purchase_id) REFERENCES purchases(purchase_id)
        ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
        ON DELETE CASCADE
);
DROP TABLE purchases_products

SELECT * from purchases_products

INSERT INTO purchases_products (product_id, purchase_id, quantity)
VALUES ('prod002','pur001',3), ('prod001', 'pur002',1), ('prod004', 'pur003',2)

--  purchases_products, purchases e products).

SELECT purchases_products.*, purchases.*, products.*
FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.purchase_id