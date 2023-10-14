-- Active: 1697323094466@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

-- SELECIONA TODOS OS USUARIOS
SELECT *FROM users;

-- INSERIR OS NOVOS USUARIOS
INSERT INTO users (id, name, email, password) VALUES
('u003', 'Shoyo', 'shoyo@email.com', 'whiscassache'),
('u004', 'Biju', 'biju@email.com', 'boladepelo'),
('u005', 'Bruno', 'bruno@email.com', 'meumaridolindo'),
('u006', 'Carol', 'carol@email.com', 'novaeuropa');

-- TABELA DE PRODUTOS
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- SELECIONA TODOS OS PRODUTOS
SELECT *FROM products;

-- INSERE NOVOS PRODUTOS
INSERT INTO products (id, name, price, description, image_url) VALUES
('prod003', 'robo aspirador', 1234.00, 'Robô Aspirador de Pó KaBuM! Smart 700, Mapeamento IR 360º, Controle via Aplicativo, Google Assistant e Alexa', 'https://images.kabum.com.br/produtos/fotos/155444/aspirador-de-po-robo-ir-360-kabum-smart-700-preto_1628768893_m.jpg'),
('prod004', 'placa de video gamer', 1800.00, 'Placa de Vídeo MSI NVIDIA GeForce RTX 3060 Ventus', 'https://images7.kabum.com.br/produtos/fotos/384627/placa-de-video-msi-nvidia-geforce-rtx-3060-ventus-2x-12gb-gddr6-dlss-ray-tracing-912-v397-272_1663850312_m.jpg'),
('prod005', 'playstation 5', 3500.00, 'Console Sony Playstation 5, Edição Digital', 'https://images.kabum.com.br/produtos/fotos/238670/console-sony-playstation-5-edicao-digital_1634132113_m.jpg'),
('prod006', 'Macbook Pro Apple 16', 12034.00, 'macbook pro de 16 polegadas', 'https://images2.kabum.com.br/produtos/fotos/sync_mirakl/479192/Macbook-Pro-Apple-16-Chip-M1-Max-32GB-SSD-1TB-Cinza-Espacial-Mk1a3bz-A_1694541516_m.jpg'),
('prod007', 'Samsung Galaxy Z Flip5', 6234.00, 'Smartphone Samsung Galaxy Z Flip5 512gb 5g Tela Dobrável 6.7 Câmera Dupla 12mp Câmera Selfie 10mp Dual Chip Android 13, Grafite', 'https://images.kabum.com.br/produtos/fotos/magalu/480251/Smartphone-Samsung-Z-Flip-5-512GB-Grafite-5G-Snapdragon-8GB-RAM-6-7-C-m-Dupla-Selfie-10MP-Dual-Chip_1692195175_m.jpg'),
('prod008', 'XBOX 360 one', 2600.00, 'Espaço de armazenamento: 512 Gb Conexões: HDMI-In/Out, Portas usb, Wi-Fi embutido Tensão: Bivolt', 'https://images-americanas.b2w.io/produtos/3052435356/imagens/console-xbox-serie-s-ssd512gb-1controle-rrs-00006/3052435364_1_xlarge.jpg');

-- BUSCA POR NOME GAME DOS PRODUTOS
SELECT * FROM products
WHERE name LIKE '%gamer%';


-- DELETAR USER BY ID
DELETE FROM users
WHERE id = 'u003';

-- DELETAR PRODUCT BY ID
DELETE FROM products
WHERE id = 'prod007';

-- EDITAR PRODUCT BY ID
UPDATE products
SET 
  name = 'xxxxxxxxxxxxx',
  price = 699.79,
  description = 'Descrição do Produto 7',
  image_url = 'novaimagemurl.jpg'
WHERE id = 'prod005';


-- TABELA DE PEDIDOS

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    product_id TEXT, -- Adicionando a coluna product_id
    product_description TEXT,
    created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
		ON DELETE CASCADE -- efeito cascata ao atualizar id na tabela users
);


-- INTRODUZIR PEDIDO
INSERT INTO purchases (id, buyer_id, total_price, product_id, product_description)
VALUES
('p001', 'u003', 100,'prod003', 'Robô Aspirador de Pó KaBuM! Smart 700, Mapeamento IR 360º, Controle via Aplicativo, Google Assistant e Alexa'),
('p002', 'u004', 300, 'prod003','Robô Aspirador de Pó KaBuM! Smart 700, Mapeamento IR 360º, Controle via Aplicativo, Google Assistant e Alexa'),
('p003', 'u005', 110, 'prod003', 'Robô Aspirador de Pó KaBuM! Smart 700, Mapeamento IR 360º, Controle via Aplicativo, Google Assistant e Alexa'),
('p004', 'u006', 200,'prod003', 'Robô Aspirador de Pó KaBuM! Smart 700, Mapeamento IR 360º, Controle via Aplicativo, Google Assistant e Alexa');

SELECT * FROM purchases;

-- EDITAR PEDIDO
UPDATE purchases
SET total_price = 700 WHERE buyer_id = 'u003'

-- JUNÇÃO DAS TABELAS

SELECT purchases.id AS idCompra, users.id AS idUser, users.name, users.email, purchases.total_price, purchases.created_at FROM purchases
INNER JOIN users ON users.id = purchases.buyer_id;

-- CRIANDO TABELA DE RELAÇÕES 

CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
  ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
	ON DELETE CASCADE -- efeito cascata ao atualizar id na tabela users
);

INSERT INTO purchases_products VALUES
('p001', 'prod003', 1),
('p001', 'prod005', 1 ),
('p002', 'prod007', 2);

SELECT *
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;