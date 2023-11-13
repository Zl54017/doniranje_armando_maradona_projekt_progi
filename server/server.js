const express = require("express");
var session = require("express-session");
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const Sequelize = require("sequelize");
const db = require("./models");
const Donor = require("./models/donor");

const donorRouter = require("./routes/donor.routes");
const bloodBankRouter = require("./routes/bloodbank.routes");
const loginRouter = require("./routes/login.routes");

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

app.use("/donor", donorRouter);
app.use("/bloodbank", bloodBankRouter);
app.use("/login", loginRouter);

const portir = 5000;
app.listen(portir);
console.log("Osluškujem na portu:", portir);