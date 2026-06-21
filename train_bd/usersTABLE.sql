CREATE TABLE users(
    id_user INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL, --UNIQUE
    password VARCHAR(255) NOT NULL,
    isActivated BOOLEAN DEFAULT FALSE,
    verification_code VARCHAR(6),
    verification_code_expires TIMESTAMPTZ DEFAULT NULL
)