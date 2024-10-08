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

router.get("/", async (req, res, next) => {});

/**
 * Create a new employee.
 * Checks if employee with given email already exists.
 */
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, bloodBankId } = req.body;

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  try {
    const existingEmployee = await db.Employee.findOne({
      where: {
        email: email,
      },
    });

    if (existingEmployee) {
      return res
        .status(401)
        .json({ message: "Employee with email already exists" });
    }

    const employee = await db.Employee.create({
      name: firstName + " " + lastName,
      email: email,
      password: hashedPassword,
      bloodBankId: bloodBankId,
    });

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
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Error creating employee" });
  }
});

// Funkcija za dohvacanje podataka o zavodu za prijavljenog zaposlenika
router.get("/employeeBloodBankDetails/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);

  try {
    const employee = await db.Employee.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const bloodBank = await db.BloodBank.findByPk(employee.bloodBankId);

    if (!bloodBank) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    res.json(bloodBank.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve blood bank details" });
  }
});

module.exports = router;
