--chcp 65001
-- SET client_encoding = 'UTF8';
--\encoding UTF8
--В cmd не PH ОТЛИЧИЯ

--Оператор,   Что делает,                          Дубликаты по умолчанию,      Скорость
--UNION,      Объединяет всё и удаляет повторы,       Удаляет,                 Медленнее (нужна сортировка)
--UNION ALL,  Объединяет всё и оставляет повторы,     Оставляет,               Очень быстро
--INTERSECT,  Находит только общие элементы,          Удаляет,                 Медленнее
--EXCEPT,     Вычитает из первого запроса второй,     Удаляет,                 Медленнее

--Учить индексы, референс
--Зачем это нужно? Это железная гарантия целостности данных:

-- Вы не сможете создать заказ в таблице orders для какого-нибудь customer_id = 99, если клиента с таким ID нет в таблице customers. База выдаст ошибку.

-- Вы не сможете случайно удалить клиента из таблицы customers, если у него есть хотя бы один заказ в таблице orders (чтобы заказы не остались «сиротами» без автора).

SELECT first_name, last_name, SUM(quantity * price)
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id
LEFT JOIN products ON orders.product_id = products.product_id
GROUP BY first_name, last_name
HAVING 