const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const { stringify } = require("querystring");

app.use(express.static("./styles"));
app.use(express.static("./images"));
app.use(express.static("./scripts"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/score", (req, res) => {
  var rl = readline.createInterface({
    input: fs.createReadStream("scores.txt"),
    output: process.stdout,
    console: false,
  });

  const scores = [];

  rl.on("line", (line) => {
    const newLine = line.split(",");
    scores.push(newLine);
  });

  rl.on("close", () => {
    scores.sort((a, b) => b[1] - a[1]);
    res.send(scores);
  });
});


app.post("/score", (req, res) => {
  fs.open("scores.txt", "a", 666, (e, id) => {
    fs.writeFileSync(id, `${req.body.name},${req.body.score}\n`);
    fs.closeSync(id, () => {
      console.log("file updated");
    });
  });
});




app.listen(3000, "127.0.0.1", () => {
  console.log("Server is listening on Socket 127.0.0.1:3000");
});
