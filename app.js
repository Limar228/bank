const express = require("express");
const confirm_routes = require("./routes/confirm_routes");
const html_routes = require("./routes/html_routes");
const user_routes = require("./routes/user_routes");

const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", user_routes);
app.use("/", html_routes);
app.use("/auth", confirm_routes);

app.use(express.static("public"));

app.listen(PORT, HOST, () =>
  console.log(`Server listen to http://${HOST}:${PORT}`),
);
