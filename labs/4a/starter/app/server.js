let axios = require("axios");
let express = require("express");
let app = express();
app.use(express.static("public"));

let apiFile = require("../key.json");
let apiKey = apiFile["key"];

let port = 3000;
let hostname = "localhost";

let baseUrl = "https://api.openweathermap.org/data/2.5/weather";

app.get("/feels-like", async (req, res) => {
  let zip = req.query.zip;

  if (!zip) {
    return res.status(400).json({ error: "Please enter a zip code" });
  }

  try {
    let response = await axios.get(baseUrl, {
      params: { zip: `${zip},us`, appid: apiKey }
    });
    let feelsLikeKelvin = response.data.main.feels_like;
    let feelsLikeFahrenheit = (feelsLikeKelvin - 273.15) * 9 / 5 + 32;

    res.json({
      zip: zip,
      "feels-like-fahrenheit": Math.round(feelsLikeFahrenheit)
    });
  } catch (error) {
    console.error(error.message);

    if (error.response) {
      let apiMessage = error.response.data && error.response.data.message;
      return res.status(400).json({
        error: apiMessage || "Could not retrieve weather data"
      });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
