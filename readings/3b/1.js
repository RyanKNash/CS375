let express = require("express");
let app = express();
app.use(express.json());
let hostname = "localhost";
let port = 3000;

app.get("/", (req, res) => {
    res.send(
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
  </head>
  <body>
    <script>
      console.log("Page loaded");
      fetch("/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({secret: "applesauce"}),
      }).then(response => {
        console.log("Status:", response.status);
        return response.text();
      }).then(body => {
        console.log("Body:", body);
      }).catch(error => {
        console.log(error);
      });
      console.log("Request sent");
    </script>
  </body>
</html>`);
});

app.post("/data", (req, res) => {
    console.log("Body:", req.body);
    res.send("Data received");
});

app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});