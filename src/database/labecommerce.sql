-- Active: 1695689491404@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

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
        'u005',
        'Luna',
        'luna@email.com',
        'luna123',
        datetime('now')
    );

INSERT INTO
    users(
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u006',
        'Breno',
        'breno@email.com',
        'breno',
        datetime('now')
    );

INSERT INTO
    users(
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
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
VALUES('prod005','Iphone 14 pro max',9500,'Uma nova forma de interação no iPhone.','https://images.kabum.com.br/produtos/fotos/393973/iphone-14-pro-max-512gb-preto-espacial-tela-6-7-camera-tripla-12mp-selfie-12mp-mqaf3be-a_1666098428_gg.jpg');

INSERT  INTO products (id,name,price,description,image_url)  VALUES('prod006','Processador AMD Ryzen 5 4600G',630,'Com os processadores AMD Ryzen para desktop, você está sempre na frente.','https://images.kabum.com.br/produtos/fotos/333145/processador-amd-ryzen-5-4600g-cache-11mb-3-7ghz-4-2ghz-max-turbo-am4-video-integrado-100-100000147box_1653338731_gg.jpg');

INSERT  INTO products (id,name,price,description,image_url)  VALUES('prod007','Placa de Vídeo gamer RTX 3060 Ventus 2X MSI NVIDIA GeForce',1700,'Jogue os jogos mais recentes usando o poder da Ampere — a arquitetura RTX de 2ª geração da NVIDIA','https://images.kabum.com.br/produtos/fotos/384627/placa-de-video-msi-nvidia-geforce-rtx-3060-ventus-2x-12gb-gddr6-dlss-ray-tracing-912-v397-272_1663850312_gg.jpg');


INSERT  INTO products (id,name,price,description,image_url)  VALUES('prod008','Roteador Tp-Link Archer C50w Wisp Preset',150,'o roteador tp-link archer c50w é a escolha ideal para quem busca uma conexão wi-fi de alta velocidade e desempenho confiável','https://images.kabum.com.br/produtos/fotos/sync_mirakl/485613/Roteador-Tp-Link-Archer-C50w-Wisp-Preset-Ac1200-Dual-Band-4-Antenas-V-6-8-_1694459323_gg.jpg');


INSERT  INTO products (id,name,price,description,image_url)  VALUES('prod009','Cooler Processador Deepcool Gammaxx Ag400',210,'Ag400 bk argbo deepcool ag400 bk argb é um cooler de cpu de torre única de 120 mm que se baseia em nosso legado para desempenho de resfriamento de alta qualidade, mas simplificado para um pacote simplificado e eficiente.','https://images.kabum.com.br/produtos/fotos/sync_mirakl/483368/Cooler-Processador-Deepcool-Gammaxx-Ag400-ARGB-120mm-Preto_1694452090_gg.jpg');


SELECT * FROM products WHERE name LIKE '%gamer%'

DELETE from users WHERE id = 'u005';

DELETE from products WHERE id = 'prod005';

UPDATE products SET name = '***********',
price = 600,
description ='descrição do produto 6',
image_url = 'novaimg.url'
WHERE id ='prod006'

