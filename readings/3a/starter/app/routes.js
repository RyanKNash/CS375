let express = require("express");

let app = express();

let hostname = "localhost";
let port = 3000;

app.get("/hey", (req, res) => {
  res.send("Yo\n");
});
app.post("/hey", (req, res) => {
  res.send("What's up?\n");
});
app.get("/foo/index.html", (req, res) => {
  res.send("Foobar\n");
});
app.get("/abc/123", (req, res) => {
  res.send("Sup\n");
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
