// require() is Node's version of Python's import
let http = require("http");
let fs = require("fs");
let path = require("path");

let hostname = "localhost";
let port = 3000;

// this function will be called whenever our server receives a request
// args are request and response objects with these properties:
// https://nodejs.org/api/http.html#http_class_http_clientrequest
// https://nodejs.org/api/http.html#http_class_http_serverresponse
function handleRequest(req, res) {
  console.log("Request URL:", req.url);
  console.log("Request headers:", req.headers);
  console.log("Request method:", req.method);
  console.log();

  let filePath = path.join(__dirname, "starter", req.url);

  function setContentType(filepath) {
    if (filepath.endsWith(".html")) {
      res.setHeader("Content-Type", "text/html");
    } else if (filepath.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    } else if (filepath.endsWith(".js")) {
      res.setHeader("Content-Type", "text/javascript");
    } else {
      res.setHeader("Content-Type", "text/plain");
    }
  }

  try {
    let data = fs.readFileSync(filePath, "utf-8");
    setContentType(filePath);
    res.statusCode = 200;
    res.end(data);
  } catch (error) {
    if (error.code === "EISDIR") {
      let indexPath = path.join(filePath, "index.html");

      try {
        let data = fs.readFileSync(indexPath, "utf-8");
        setContentType(indexPath);
        res.statusCode = 200;
        res.end(data);
      } catch (indexError) {
        if (indexError.code === "ENOENT" || indexError.code === "ENOTDIR") {
          res.setHeader("Content-Type", "text/plain");
          res.statusCode = 404;
          res.end("File not found");
        } else {
          res.setHeader("Content-Type", "text/plain");
          res.statusCode = 500;
          res.end("Something went wrong");
        }
      }
    } else if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 404;
      res.end("File not found");
    } else {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 500;
      res.end("Something went wrong");
    }
  }
}

// now handleRequest will be called whenever our program receives a request
// the server will automatically pass request and response objects to it
let server = http.createServer(handleRequest);

// starts the server listening for requests at http://<hostname>:<port>
// 3rd arg is a function called once when the server first starts
server.listen(port, hostname, function () {
  console.log(`Server listening on http://${hostname}:${port}`);
});
