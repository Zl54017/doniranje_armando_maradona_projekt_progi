const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const donorRouter = require("./routes/donor.routes");
const bloodBankRouter = require("./routes/bloodbank.routes");
const loginRouter = require("./routes/login.routes");
const registerRouter = require("./routes/register.routes");
const logoutRouter = require("./routes/logout.routes");
const employeeRouter = require("./routes/employee.routes");

app.use("/donor", donorRouter);
app.use("/bloodbank", bloodBankRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/employee", employeeRouter);

const portir = 5000;
app.listen(portir);
console.log("Osluškujem na portu:", portir);
