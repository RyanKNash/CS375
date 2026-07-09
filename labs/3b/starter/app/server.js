const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

app.use(express.static("public"));

// returns random integer in range [min, max]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples
function getRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

app.get("/random", (req, res) => {
  console.log("Received query string:", req.query);
  let minText = req.query.min;
  let maxText = req.query.max;
  let min = Number(req.query.min);
  let max = Number(req.query.max);

  if (minText === undefined || maxText === undefined || minText === "" || maxText === "" || !Number.isFinite(min) || !Number.isFinite(max) || min > max) {
    res.status(400).json({ error: "min and max must be valid numbers, and min must be less than or equal to max" });
    return;
  }

  let randomNumber = getRandomIntegerInRange(min, max);
  console.log("Selected random number", randomNumber);
  res.json({ number: randomNumber });
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});

/*
Server-side validation is necessary because client-side validation
can be bypassed by disabling JavaScript or sending requests direct
ly to the server with tools like curl. Server-side validation 
ensures that invalid or malicious data cannot be processed, 
even if the client does not perform any checks.
*/
