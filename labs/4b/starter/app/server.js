let express = require("express");
let { Pool } = require("pg");
let env = require("../env.json");

let hostname = "localhost";
let port = 3000;
let app = express();

app.use(express.json());
app.use(express.static("public"));

let pool = new Pool(env);
pool.connect().then(() => {
  console.log("Connected to database");
});

// TODO comment this out after question 1
/*
pool
  .query(
    `INSERT INTO animals(name, age, species) 
    VALUES($1, $2, $3)
    RETURNING *`,
    ["Spot", 4, "dog"],
  )
  .then((result) => {
    // row was successfully inserted into table
    console.log("Inserted:");
    console.log(result.rows);
  })
  .catch((error) => {
    // something went wrong when inserting the row
    console.log(error);
  });
*/

let validSpecies = ["cat", "dog", "turtle", "antelope"];

app.post("/animal", (req, res) => {
  let body = req.body;
  console.log(body);
  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("age") ||
    !body.hasOwnProperty("species") ||
    body.name === "" ||
    !Number.isInteger(body.age) ||
    !validSpecies.includes(body.species)
  ) {
    return res.status(400).end();
  }

  pool
    .query(
      `INSERT INTO animals(name, age, species)
      VALUES($1, $2, $3)`,
      [body.name, body.age, body.species],
    )
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

app.get("/animal", (req, res) => {
  let species = req.query.species;

  if (!validSpecies.includes(species)) {
    return res.status(400).end();
  }

  pool
    .query(`SELECT * FROM animals WHERE species = $1`, [species])
    .then((result) => {
      res.status(200).json({ rows: result.rows });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
