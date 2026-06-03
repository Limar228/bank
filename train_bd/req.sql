-- ==========================================
-- 0. Настройка вывода консоли(65001) и импорт таблицы(encoding UTF8; SET client_encoding = 'UTF8')
-- ==========================================


-- ==========================================
-- 1. УДАЛЕНИЕ СТАРЫХ ТАБЛИЦ (если они были)
-- ==========================================
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Products;


-- ==========================================
-- 2. СОЗДАНИЕ ТАБЛИЦ
-- ==========================================

-- Таблица клиентов
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    city VARCHAR(50),
    registration_date DATE
);

-- Таблица товаров
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INT
);

-- Таблица заказов (связывает клиентов и товары)
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    order_date DATE,
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);


-- ==========================================
-- 3. ЗАПОЛНЕНИЕ ДАННЫМИ
-- ==========================================

-- Наполняем клиентов
INSERT INTO Customers (customer_id, first_name, last_name, city, registration_date) VALUES
(1, 'Иван', 'Иванов', 'Москва', '2025-01-15'),
(2, 'Анна', 'Петрова', 'Санкт-Петербург', '2025-02-20'),
(3, 'Дмитрий', 'Сидоров', 'Новосибирск', '2025-03-10'),
(4, 'Елена', 'Смирнова', 'Москва', '2025-04-05'),
(5, 'Михаил', 'Федоров', 'Казань', '2025-05-12');

-- Наполняем товары
INSERT INTO Products (product_id, product_name, category, price, stock_quantity) VALUES
(101, 'Смартфон X', 'Электроника', 59999.00, 15),
(102, 'Ноутбук Pro', 'Электроника', 129999.00, 7),
(103, 'Беспроводные наушники', 'Аксессуары', 9999.00, 50),
(104, 'Кожаный ремень', 'Одежда', 3500.00, 20),
(105, 'Зимняя куртка', 'Одежда', 15000.00, 0); -- товара нет в наличии

-- Наполняем заказы
INSERT INTO Orders (order_id, customer_id, product_id, order_date, quantity) VALUES
(1, 1, 101, '2026-05-01', 1), -- Иван купил смартфон
(2, 2, 103, '2026-05-03', 2), -- Анна купила 2 пары наушников
(3, 1, 104, '2026-05-04', 1), -- Иван купил ремень
(4, 3, 102, '2026-05-10', 1), -- Дмитрий купил ноутбук
(5, 4, 101, '2026-05-12', 1), -- Елена купила смартфон
(6, 2, 104, '2026-05-15', 1); -- Анна купила ремень