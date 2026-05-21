const express = require("express");
const route = require("./routes/route");

const PORT = process.env.PORT || 3000;
const HOST = "localhost";

const app = express();
app.use(express.json());

app.use("/auth", route);

app.listen(PORT, HOST, () =>
  console.log(`Server listen to http://${HOST}:${PORT}`),
);
