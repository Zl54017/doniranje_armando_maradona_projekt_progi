var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const crypto = require("crypto");

const db = require("../models");
const Donor = require("../models/donor");
const BloodBank = require("../models/bloodbank");
const Action = require("../models/action");
const Certificate = require("../models/certificate");
const Donation = require("../models/donation");
const ActionRegistration = require("../models/actionregistration");
const Employee = require("../models/employee");
const Sequelize = require("sequelize");

const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");

router.get("/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  if (decoded.role === "donor") {
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });
    res.json({
      user: donor,
      role: 'donor',
      token: req.params.token,
    })
  } else if (decoded.role === "employee") {
    const employee = await db.Employee.findOne({
      where: {
        id: decoded.id,
      },
    });
    res.json({
      user: employee,
      role: 'employee',
      token: req.params.token,
    })

  } else {
    res.status(404).json({
      message: "Decode failed"
    });
  }
});

router.post("/", async (req, res) => {
  const {
    email,
    password
  } = req.body;

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const donor = await db.Donor.findOne({
    where: {
      email: email,
      password: hashedPassword,
    },
  });

  const bloodBank = await db.BloodBank.findOne({
    where: {
      email: email,
      password: hashedPassword,
    },
  });

  const employee = await db.Employee.findOne({
    where: {
      email: email,
      password: hashedPassword,
    },
  });

  if (donor) {
    const data = {
      id: donor.id,
      email: donor.email,
      role: "donor",
    };
    const token = jwt.sign(data, "progi123");

    res.json({
      user: donor,
      role: "donor",
      token: token,
    });
  } else if (bloodBank) {
    const data = {
      id: bloodBank.id,
      email: bloodBank.email,
      role: "bloodBank",
    };
    const token = jwt.sign(data, "progi123");

    res.json({
      user: bloodBank,
      role: "bloodBank",
      token: token,
    });
  } else if (employee) {
    const data = {
      id: employee.id,
      email: employee.email,
      role: "employee",
    };
    const token = jwt.sign(data, "progi123");

    res.json({
      user: employee,
      role: "employee",
      token: token,
    });
  } else {
    res.status(401).json({
      message: "Login failed",
    });
  }
});

module.exports = router;