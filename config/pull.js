const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || undefined,
  port: Number(process.env.DB_PORT),
  max: Number(process.env.DB_MAX_CONNECTIONS) || 5,
  idleTimeoutMillis: 30000,
});

let tunnelCounter = 0;

pool.on("connect", (client) => {
  tunnelCounter++;
  client.tunnelId = tunnelCounter;
  console.log(`[Пул] Создан туннель №${client.tunnelId}`);
});

pool.on("acquire", (client) => {
  console.log(`[Пул] Туннель №${client.tunnelId} забран из пула запрос`);
});

pool.on("release", (err, client) => {
  if (client && client.tunnelId) {
    console.log(`[Пул] Туннель №${client.tunnelId} вернулся в пул`);
  }
});
pool.on("error", (err) => {
  console.error("Непредвиденная ошибка пула БД:", err);
});
module.exports = pool;
