CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    balance NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE
);