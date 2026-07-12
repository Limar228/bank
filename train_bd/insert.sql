-- -- Убеждаемся, что мы работаем в чистой среде
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS customers;
-- DROP TABLE IF EXISTS products;

-- -- Таблица товаров
-- CREATE TABLE products (
--     product_id INT PRIMARY KEY,
--     product_name TEXT,
--     category TEXT,
--     price DECIMAL(10, 2),
--     stock_quantity INT
-- );

-- -- Таблица клиентов
-- CREATE TABLE customers (
--     customer_id INT PRIMARY KEY,
--     first_name TEXT,
--     last_name TEXT,
--     city TEXT,
--     registration_date DATE
-- );

-- -- Таблица заказов
-- CREATE TABLE orders (
--     order_id INT PRIMARY KEY,
--     customer_id INT REFERENCES customers(customer_id),
--     product_id INT REFERENCES products(product_id),
--     order_date DATE,
--     quantity INT
-- );

-- INSERT INTO products VALUES
-- (101, 'Смартфон X', 'Электроника', 59999.00, 15),
-- (102, 'Ноутбук Pro', 'Электроника', 129999.00, 7),
-- (103, 'Беспроводные наушники', 'Аксессуары', 9999.00, 50),
-- (104, 'Кожаный ремень', 'Одежда', 3500.00, 20),
-- (105, 'Зимняя куртка', 'Одежда', 15000.00, 0);

-- INSERT INTO customers VALUES
-- (1, 'Иван', 'Иванов', 'Москва', '2025-01-15'),
-- (2, 'Анна', 'Петрова', 'Санкт-Петербург', '2025-02-20'),
-- (3, 'Дмитрий', 'Сидоров', 'Новосибирск', '2025-03-10'),
-- (4, 'Елена', 'Смирнова', 'Москва', '2025-04-05'),
-- (5, 'Михаил', 'Федоров', 'Казань', '2025-05-12');

-- INSERT INTO orders VALUES
-- (1, 1, 101, '2026-05-01', 1),
-- (2, 2, 103, '2026-05-03', 2),
-- (3, 1, 104, '2026-05-04', 1),
-- (4, 3, 102, '2026-05-10', 1),
-- (5, 4, 101, '2026-05-12', 1),
-- (6, 2, 104, '2026-05-15', 1);
INSERT INTO cards (name, type, number, account_id) VALUES('СБЕРБАНК' , 'card', '3333 3333 3333 4321', 3)