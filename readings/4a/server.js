let express = require("express");
let axios = require("axios");
let myKeys = require("../key.json");

let hostname = "localhost";
let port = 3000;
let apiKey = myKeys.key;
let app = express();

app.use(express.static("public"));

app.get("/data", (req, res) => {
  let zip = req.query.zip;
  let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
  console.log("Client requested /data"); // #1
  axios(url).then(response => {
    console.log("API response received"); // #2
    res.json(response.data);
  }).catch(error => {
    console.log("Error when requesting from API", error); // #3
    res.status(500).json({});
  });
  console.log("Request sent to API"); // #4
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`); // #5
});