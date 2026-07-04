-- ALTER TABLE users 
-- ADD COLUMN refresh TEXT ;
-- ALTER TABLE users 
-- ALTER COLUMN refresh DROP NOT NULL;
UPDATE users
       SET refresh = '44444444444'
       WHERE id_user = '3';