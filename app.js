const express = require("express");
const reg_routes = require("./routes/reg_routes");
const apiRoutes = require("./routes/apiRoutes");
const html_routes = require("./routes/html_routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", reg_routes);
app.use("/api", apiRoutes);
app.use("/", html_routes);

app.use(express.static("public"));

app.listen(PORT, HOST, () =>
  console.log(`Server listen to http://${HOST}:${PORT}`),
);
