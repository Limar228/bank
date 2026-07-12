CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    
    -- Ссылаемся на id счета, по которому произошло движение денег
    account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- Сумма операции. При пополнении пишем с плюсом (100.00), при трате/снятии — с минусом (-50.00)
    amount NUMERIC(15, 2) NOT NULL,
    
    -- Тип транзакции для удобной фильтрации на бэкенде (например: 'deposit' или 'withdraw')
    transaction_type VARCHAR(20) NOT NULL,
    
    -- Текстовое описание операции для отображения пользователю
    description TEXT NOT NULL,
    
    -- Дата и время транзакции. PostgreSQL подставит текущее время автоматически при INSERT
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);