--chcp 65001
-- SET client_encoding = 'UTF8';
--\encoding UTF8

--Оператор,   Что делает,                          Дубликаты по умолчанию,      Скорость
--UNION,      Объединяет всё и удаляет повторы,       Удаляет,                 Медленнее (нужна сортировка)
--UNION ALL,  Объединяет всё и оставляет повторы,     Оставляет,               Очень быстро
--INTERSECT,  Находит только общие элементы,          Удаляет,                 Медленнее
--EXCEPT,     Вычитает из первого запроса второй,     Удаляет,                 Медленнее

--Учить индексы, референс
--Зачем это нужно? Это железная гарантия целостности данных:

-- Вы не сможете создать заказ в таблице orders для какого-нибудь customer_id = 99, если клиента с таким ID нет в таблице customers. База выдаст ошибку.

-- Вы не сможете случайно удалить клиента из таблицы customers, если у него есть хотя бы один заказ в таблице orders (чтобы заказы не остались «сиротами» без автора).


-- SELECT 
--     a.id AS account_id,
--     a.balance AS account_balance,
--     a.currency,
--     c.name AS card_name,
--     c.number AS card_number,
--     a.balance AS card_balance
-- FROM accounts a
-- INNER JOIN cards c ON a.id = c.account_id
-- WHERE a.user_id = 1
-- DELETE FROM cards WHERE id = (SELECT MAX(id) FROM cards);
-- INSERT INTO accounts (balance, currency, card_id) VALUES ('0', 'RUB', '1')
-- DELETE FROM cards WHERE id = (SELECT MAX(id) FROM cards);

-- -- Шаг 2: Сдвигаем счетчик на актуальный максимум
-- SELECT setval('cards_id_seq', (SELECT MAX(id) FROM cards));

-- SELECT 
--     a.id,
--     c.name,
--     c.type,
--     c.number,
--     a.balance
--     FROM accounts a
--     INNER JOIN cards c ON a.card_id = c.id
--     WHERE c.user_id = 1
    
UPDATE accounts 
    SET balance = balance - 22
    FROM cards 
    WHERE accounts.card_id = cards.id
      AND cards.number = '3333 3333 3333 4321'
      AND cards.user_id = 1
      RETURNING
    22 AS transferred_amount;
