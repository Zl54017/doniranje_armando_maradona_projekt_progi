const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const donorRouter = require("./routes/donor.routes");
const bloodBankRouter = require("./routes/bloodbank.routes");
const loginRouter = require("./routes/login.routes");
const registerRouter = require("./routes/register.routes");

app.use("/donor", donorRouter);
app.use("/bloodbank", bloodBankRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

const portir = 5000;
app.listen(portir);
console.log("Osluškujem na portu:", portir);
