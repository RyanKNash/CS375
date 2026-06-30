let http = require("http");
let hostname = "127.0.0.1";
let port = 3000;
function handleRequest(req, res) {
  console.log(req.url, req.headers, req.method);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<p>Hello! <strong>I am a paragraph!</strong></p>\n");
}
let server = http.createServer(handleRequest);
server.listen(port, hostname, function () {
  console.log(`Server listening on http://${hostname}:${port}`);
});