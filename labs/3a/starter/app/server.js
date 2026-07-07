let express = require("express");

// express returns a function, we can call it to create a server object
let app = express();

let port = 3000;
let hostname = "localhost";

app.use(express.json());

// middleware just for debugging
app.use((req, res, next) => {
  console.log({ url: req.url, body: req.body });
  // makes sure next matching request handler is called
  // necessary b/c this doesn't send a response
  next();
});

app.post("/flargle", (req, res) => {
  console.log("You sent the body:", req.body);

  if ("flargle" in req.body) {
    res.json({ hasFlargle: true });
  } else {
    res.json({ hasFlargle: false });
  }
});

let visitors = [];

app.get("/visitors/:visitorName", (req, res) => {
  let visitorName = req.params.visitorName;

  if (visitors.includes(visitorName)) {
    res.json({ hasVisited: true });
  } else {
    res.json({ hasVisited: false });
  }
});

app.post("/visitors/:visitorName", (req, res) => {
  let visitorName = req.params.visitorName;
  visitors.push(visitorName);
  res.send();
});

app.get("/all-visitors", (req, res) => {
  let visitorItems = visitors
    .map((visitorName) => `<li>${visitorName}</li>`)
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>All Visitors</title>
    </head>
    <body>
      <h1>All Visitors</h1>
      <ul>
        ${visitorItems}
      </ul>
    </body>
    </html>`);
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
