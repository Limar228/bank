const express = require("express");
const route = require("./routes/route");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
const HOST = "localhost";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", route);
app.use(express.static("public"));

app.listen(PORT, HOST, () =>
  console.log(`Server listen to http://${HOST}:${PORT}`),
);
