const express = require("express");
var session = require("express-session");
const app = express();
const Sequelize = require("sequelize");
const db = require("./models");
const Donor = require("./models/donor");

app.use(
  session({
    secret: "Tajna",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.get("/donors", async (req, res) => {
  try {
    console.log(Donor);
    const donors = await db.Donor.findAll();

    res.send(
      `<h1>List of Donors</h1><pre>${JSON.stringify(donors, null, 2)}</pre>`
    );
  } catch (error) {
    console.error("Error retrieving donors:", error);
    res.status(500).send("Error retrieving donors from the database.");
  }
});

const portir = 3000;
app.listen(portir);
console.log("Osluškujem na portu:", portir);
