 SELECT username, balance, currency
 FROM users u
 LEFT JOIN accounts a ON u.id_user = a.user_id
