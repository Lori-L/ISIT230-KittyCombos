const http = require("http");
const express = require("express");
const app = express();
const mainRouter = require("/server.js");

app.use("/", mainRouter);

app.listen(3000, "127.0.0.1", () => {
  console.log("Server is listening on Socket 127.0.0.1:3000");
});
