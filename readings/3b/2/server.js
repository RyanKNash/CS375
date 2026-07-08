let express = require("express");
let hostname = "localhost";
let port = 3000;
let app = express();
app.use(express.json());
app.use(express.static("public"))
app.get("/a-cool-route", (req, res) => {
  res.json({abc: 123})
});
app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});