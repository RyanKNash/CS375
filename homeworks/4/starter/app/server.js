let axios = require("axios");
let express = require("express");
let app = express();
let apiFile = require("../env.json");
let apiKey = apiFile["api_key"]; // use this to make requests
let baseUrl = apiFile["api_url"]; // use this to make requests
let port = 3000;
let hostname = "localhost";
app.use(express.static("public"));
// don't change code above this line

app.get("/forecast", async (req, res) => {
  let zip = req.query.zip;

  try {
    let response = await axios.get(baseUrl, {
      params: { zip: zip, appid: apiKey },
    });

    res.json({
      City: response.data.city.name,
      forecasts: response.data.list.map((forecast) => ({
        Date: forecast.dt_txt,
        Forecast:
          forecast.weather[0].description.charAt(0).toUpperCase() +
          forecast.weather[0].description.slice(1),
        Icon: forecast.weather[0].icon,
        Temperature: parseFloat(
          (((forecast.main.temp - 273.15) * 9) / 5 + 32).toFixed(1),
        ),
      })),
    });
  } catch (error) {
    console.error(error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data.message,
      });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
