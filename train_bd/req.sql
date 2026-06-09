--chcp 65001
-- SET client_encoding = 'UTF8';
--\encoding UTF8
--В cmd не PH ОТЛИЧИЯ

--Оператор,   Что делает,                          Дубликаты по умолчанию,      Скорость
--UNION,      Объединяет всё и удаляет повторы,       Удаляет,                 Медленнее (нужна сортировка)
--UNION ALL,  Объединяет всё и оставляет повторы,     Оставляет,               Очень быстро
--INTERSECT,  Находит только общие элементы,          Удаляет,                 Медленнее
--EXCEPT,     Вычитает из первого запроса второй,     Удаляет,                 Медленнее

SELECT category, SUM(stock_quantity)
FROM products
GROUP BY category
HAVING SUM(stock_quantity) = 0;