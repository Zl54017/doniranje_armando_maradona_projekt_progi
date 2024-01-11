var express = require("express");
var router = express.Router();

const db = require("../models");
const Donor = require("../models/donor");
const BloodBank = require("../models/bloodbank");
const Action = require("../models/action");
const Certificate = require("../models/certificate");
const Donation = require("../models/donation");
const ActionRegistration = require("../models/actionregistration");
const FAQ = require("../models/faq");
const News = require("../models/news");
const Employee = require("../models/employee");
const Sequelize = require("sequelize");

const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");

router.get("/", async (req, res, next) => {});

/**
 * Handle the POST request to retrieve inventory of blood
 */
router.post("/inventory/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    const results = await db.Donation.findAll({
      attributes: [
        [Sequelize.literal('"donor"."bloodType"'), "bloodType"],
        [Sequelize.literal("0.5 * COUNT(*)"), "donationCount"],
      ],
      include: [
        {
          model: db.Donor,
          as: "donor",
          attributes: [],
        },
      ],
      where: {
        used: false,
        warning: "",
        bloodBankId: bloodBank.id,
      },
      group: ["donor.bloodType"],
    });

    const table = {};
    results.forEach((result) => {
      table[result.dataValues.bloodType] = parseFloat(
        result.dataValues.donationCount
      );
    });
    res.json(table);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve inventory" });
  }
});

//funkcija za dohvatiti zalihu krvi određene krvne grupe
router.get("/inventory/:bloodType", async (req, res, next) => {
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    const bloodType = req.params.bloodType;

    const result = await db.Donation.findAll({
      where: {
        used: false,
      },
      include: [
        {
          model: db.Donor,
          as: "donor",
          where: {
            transfusionInstitute: bloodBank.name,
            bloodType: bloodType,
          },
        },
      ],
    });

    // Račun za ukupnu količinu krvi u litrama
    let totalBloodQuantity = result.reduce((total, donation) => {
      return total + 0.5; // Svaka donacija je 0.5 litara
    }, 0);

    res.json({ bloodType, quantityInLiters: totalBloodQuantity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve blood inventory" });
  }
});

//funkcija za uzeti određenu količinu krvi neke krvne grupe
router.post("/takeBlood/:bloodType/:quantityToTake", async (req, res, next) => {
  try {
    const bloodType = req.params.bloodType;
    const quantityToTake = parseFloat(req.params.quantityToTake);

    const bloodBank = await db.BloodBank.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    // Pronađi starije donacije koje odgovaraju traženoj krvnoj grupi i nisu već iskorištene, sortirane po datumu
    const olderDonations = await db.Donation.findAll({
      where: {
        used: false,
        "$donor.bloodType$": bloodType, // Tražena krvna grupa
        "$donor.transfusionInstitute$": bloodBank.name, // Banka krvi
      },
      include: [
        {
          model: db.Donor,
          as: "donor",
        },
      ],
      order: [["date", "ASC"]], // Sortiraj prema atributu "date" (od najstarije prema najnovijoj)
    });

    // Izračunaj ukupnu dostupnu količinu krvi
    let availableQuantity = olderDonations.length * 0.5; // Svaka donacija je 0.5 litara

    if (availableQuantity >= quantityToTake) {
      // Ako ima dovoljno krvi, ažuriraj stanje zalihe i označi donacije kao iskorištene
      let quantityTaken = 0;

      for (const donation of olderDonations) {
        if (quantityTaken < quantityToTake) {
          const remainingQuantity = quantityToTake - quantityTaken;
          if (0.5 <= remainingQuantity) {
            // Cijela donacija je potrošena
            donation.used = true;
            donation.save();
            quantityTaken += 0.5;
          } else {
            // Samo dio donacije je potrošen
            quantityTaken = quantityToTake;
          }
        }
      }

      res.json({
        success: true,
        message: `Uspješno je uzeto ${quantityToTake} litara krvi (${bloodType}).`,
      });
    } else {
      res.status(400).json({
        error: `Nedovoljna količina krvi (${bloodType}) na zalihama.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greška pri uzimanju krvi iz zalihe." });
  }
});

//funkcija za slanje pozivnica donatorima ovisno o manjku pojedine krvne grupe
router.post("/sendInvitations/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    // Dohvati sve krvne grupe koje imaju manje od 10 litara zaliha
    const lowInventoryBloodTypes = await db.Donation.findAll({
      attributes: [
        [Sequelize.literal('"donor"."bloodType"'), "bloodType"],
        [Sequelize.literal("0.5 * COUNT(*)"), "totalQuantity"],
      ],
      include: [
        {
          model: db.Donor,
          as: "donor",
          attributes: [],
          where: {
            transfusionInstitute: bloodBank.name,
          },
        },
      ],
      where: {
        used: false,
      },
      group: ["donor.bloodType"],
      having: Sequelize.literal("totalQuantity < 10"),
    });

    // Dohvati donatore za svaku krvnu grupu s manje od 10 litara zaliha
    const donorsToInvite = await db.Donor.findAll({
      where: {
        bloodType: lowInventoryBloodTypes.map(
          (item) => item.dataValues.bloodType
        ),
      },
    });

    // Treba još implementirati sustav/kanal preko kojega slati pozivnice (e-mail, SMS...)

    res.json({ success: true, message: "Invitations sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send invitations" });
  }
});

//funkcija za izdavanje potvrde donatoru
router.post("/issueCertificate/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    const { donorId, date } = req.body;

    // Provjeri je li donacija već zabilježena za određenog donatora i datum
    const existingDonation = await db.Donation.findOne({
      where: {
        donorId: donorId,
        date: date,
      },
    });

    if (!existingDonation) {
      res.status(400).json({
        error: "Donation not found for the specified donor and date.",
      });
      return;
    }

    // Provjeri je li potvrda već izdana
    if (existingDonation.used) {
      res
        .status(400)
        .json({ error: "Certificate already issued for this donation." });
      return;
    }

    // Označi donaciju kao iskorištenu
    existingDonation.used = true;
    await existingDonation.save();

    // Kreiranje potvrdu
    const newCertificate = await db.Certificate.create({
      date: date,
      donorId: donorId,
      bloodBankId: bloodBank.id,
    });

    res.json(newCertificate.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to issue certificate" });
  }
});

//funkcija za kreiranje akcije
router.post("/createAction", async (req, res, next) => {
  try {
    const { bloodBankId, date, minNumberOfDonors } = req.body;
    const bloodBank = await db.BloodBank.findByPk(bloodBankId);

    if (!bloodBank) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    const newAction = await db.Action.create({
      bloodBankId: bloodBank.id,
      address: bloodBank.address,
      date: date,
      minNumberOfDonors: minNumberOfDonors,
    });

    res.json(newAction.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create action" });
  }
});

//funkcija koja na zahtjev korisnika vraca uvid u popis donora pojedinog zavoda
router.get("/donorsByBloodBank/:bloodBankId", async (req, res, next) => {
  try {
    const bloodBankId = req.params.bloodBankId;

    const bloodBank = await db.BloodBank.findByPk(bloodBankId);
    if (!bloodBank) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    const bloodBankName = bloodBank.name;

    const donors = await db.Donor.findAll({
      where: {
        transfusionInstitute: bloodBankName,
      },
    });

    res.json(donors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve donors by blood bank" });
  }
});

// Funkcija za pronalazak zavoda s najmanje tražene krvne grupe kako bi korisnik mogao izabrati taj zavod za darivanje krvi
router.get("/minBloodGroup/:bloodType", async (req, res, next) => {
  try {
    const bloodType = req.params.bloodType;

    const bloodBanks = await db.BloodBank.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: db.Donor,
          as: "donors",
          where: {
            bloodType: bloodType,
          },
          required: true,
        },
      ],
      group: ["BloodBank.id"],
      order: db.sequelize.literal("COUNT(`donors`.`bloodType`) ASC"),
      limit: 1,
    });

    if (bloodBanks.length > 0) {
      res.json({
        bloodType: bloodType,
        bloodBankWithMinGroup: {
          id: bloodBanks[0].id,
          name: bloodBanks[0].name,
        },
      });
    } else {
      res
        .status(404)
        .json({ error: `No blood banks with blood type ${bloodType} found.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to retrieve blood bank with minimum blood group",
    });
  }
});

//funkcija za filtriranje donora po svim mogucim atributima
router.get("/filteredDonors", async (req, res, next) => {
  try {
    const { name, donorName, bloodType, gender, minAge, maxAge } = req.query;

    let whereCondition = {};

    if (name) {
      whereCondition.transfusionInstitute = name;
    }

    if (donorName) {
      whereCondition.name = { [Sequelize.Op.like]: `%${donorName}%` };
    }

    if (bloodType) {
      whereCondition.bloodType = bloodType;
    }

    if (gender) {
      whereCondition.gender = gender;
    }

    if (minAge && maxAge) {
      whereCondition.age = { [Sequelize.Op.between]: [minAge, maxAge] };
    } else if (minAge) {
      whereCondition.age = { [Sequelize.Op.gte]: minAge };
    } else if (maxAge) {
      whereCondition.age = { [Sequelize.Op.lte]: maxAge };
    }

    const donors = await db.Donor.findAll({
      where: whereCondition,
    });

    res.json(donors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve filtered donors" });
  }
});

// Funkcija za dodavanje zaposlenika zavoda (Employee)
router.post("/addEmployee", async (req, res, next) => {
  try {
    const { name, email, password, bloodBankId } = req.body;

    const existingEmployee = await db.Employee.findOne({
      where: { email: email },
    });

    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "Employee with this email already exists" });
    }

    // Dodaj novog zaposlenika
    const newEmployee = await db.Employee.create({
      name: name,
      email: email,
      password: password,
      bloodBankId: bloodBankId,
    });

    res.json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

// Funkcija za dohvaćanje sadašnjih akcija nekog zavoda
router.get("/bloodBankActiveActions/:bloodBankId", async (req, res, next) => {
  const bloodBankId = req.params.bloodBankId;

  try {
    const currentDate = new Date();
    const bloodBank = await db.BloodBank.findByPk(bloodBankId, {
      include: [
        {
          model: db.Action,
          as: "actions",
          where: {
            date: { [Sequelize.Op.gte]: currentDate }, // Dohvati akcije čiji je datum veći ili jednak od trenutnog datuma
          },
          order: [["date", "ASC"]],
        },
      ],
    });

    if (!bloodBank) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    res.json(bloodBank.actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve active actions" });
  }
});

// Funkcija za dohvaćanje prethodnih akcija nekog zavoda
router.get("/bloodBankPastActions/:bloodBankId", async (req, res, next) => {
  const bloodBankId = req.params.bloodBankId;

  try {
    const currentDate = new Date();
    const bloodBank = await db.BloodBank.findByPk(bloodBankId, {
      include: [
        {
          model: db.Action,
          as: "actions",
          where: {
            date: { [Sequelize.Op.lt]: currentDate }, // Dohvati akcije čiji je datum manji od trenutnog datuma
          },
          order: [["date", "DESC"]],
        },
      ],
    });

    if (!bloodBank) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    let pastActions = bloodBank.actions || []; // Provjera i zamjena ako lista nije definirana ili je prazna

    res.json(pastActions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve past actions" });
  }
});

//funkcija za dohvacanje popisa zaposlenika zavoda po imenu zavoda
router.get("/employeesByBloodBank/:bloodBankName", async (req, res, next) => {
  try {
    const bloodBankName = req.params.bloodBankName;
    const bloodBank = await db.BloodBank.findOne({
      where: {
        name: bloodBankName,
      },
    });

    if (!bloodBank) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    const bloodBankId = bloodBank.id;

    const employees = await db.Employee.findAll({
      where: {
        bloodBankId: bloodBankId,
      },
    });

    res.json(employees);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve employees by blood bank" });
  }
});

// Funkcija za brisanje donora po Id-u
router.delete("/deleteDonor/:donorId", async (req, res, next) => {
  try {
    const donorId = req.params.donorId;

    const donor = await db.Donor.findByPk(donorId);

    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    donor.email = `${donor.email} (archived)`;
    await donor.save();

    res.json({ message: "Donor archived successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete donor" });
  }
});

// Funkcija za brisanje zaposlenika po Id-u
router.delete("/deleteEmployee/:employeeId", async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;

    const employee = await db.Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    employee.email = `${employee.email} (archived)`;
    await employee.save();

    res.json({ message: "Employee archived successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

// Funkcija za dodavanje novog zavoda
router.post("/addBloodBank", async (req, res, next) => {
  try {
    const { name, email, password, address, numberOfDonors } = req.body;

    const existingBloodBank = await db.BloodBank.findOne({
      where: { email: email },
    });

    if (existingBloodBank) {
      return res
        .status(400)
        .json({ error: "Blood bank with this email already exists" });
    }

    const newBloodBank = await db.BloodBank.create({
      name: name,
      email: email,
      password: password,
      address: address,
      numberOfDonors: numberOfDonors || 0,
    });

    res.json(newBloodBank.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add Blood Bank" });
  }
});

// Funkcija koja vraca popis svih zavoda (imena zavoda)
router.get("/allBloodBankNames", async (req, res, next) => {
  try {
    const bloodbankNames = await db.BloodBank.findAll({
      attributes: ["name"],
    });

    const names = bloodbankNames.map((bloodbank) => bloodbank.name);

    res.json(names);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve Blood Bank names" });
  }
});

// Funkcija za brisanje faq-a po Idu
router.delete("/deleteFAQ/:faqId", async (req, res, next) => {
  try {
    const { faqId } = req.params;

    const deletedFAQ = await db.FAQ.destroy({
      where: {
        id: faqId,
      },
    });

    if (deletedFAQ === 0) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
});

// Funkcija za brisanje newsa po Idu
router.delete("/deleteNews/:newsId", async (req, res, next) => {
  try {
    const { newsId } = req.params;

    const deletedNews = await db.News.destroy({
      where: {
        id: newsId,
      },
    });

    if (deletedNews === 0) {
      return res.status(404).json({ error: "News not found" });
    }

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete News" });
  }
});

// Funkcija koja vraca broj donora za zavod (po Id-u zavoda)
router.get("/activeDonorsCount/:bloodBankId", async (req, res, next) => {
  try {
    const { bloodBankId } = req.params;

    const activeDonorsCount = await db.Donor.count({
      where: {
        bloodBankId: bloodBankId,
        email: { [db.Sequelize.Op.notLike]: "%(archived)" },
      },
    });

    res.json({ activeDonorsCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve active donors count" });
  }
});

/**
 * Handle the POST request to add a donation.
 */
router.post("/addDonation/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    const { donorId, warning, date, address } = req.body;

    const newDonation = await db.Donation.create({
      date: date,
      address: address,
      warning: warning,
      donorId: donorId,
      bloodBankId: bloodBank.id,
      used: false,
    });

    await db.Donor.update(
      { numberOfDonations: db.sequelize.literal('"numberOfDonations" + 1') },
      {
        where: {
          id: donorId,
        },
      }
    );

    res.json(newDonation.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add donation" });
  }
});

/**
 * Handle the POST request to see all registrations for an action.
 */
router.post("/registrations", async (req, res, next) => {
  try {
    const { actionId } = req.body;

    const registrations = await db.ActionRegistration.findAll({
      where: {
        actionId: actionId,
      },
    });

    res.json(registrations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve registrations" });
  }
});

/**
 * Handle the GET request to retrieve all blood banks for selection (id and names).
 */
router.get("/allBloodBanks", async (req, res, next) => {
  try {
    const bloodbanks = await db.BloodBank.findAll({
      attributes: ["id", "name"],
    });

    const bloodbankDictionary = bloodbanks.reduce((acc, bloodbank) => {
      acc[bloodbank.id] = bloodbank.name;
      return acc;
    }, {});

    res.json(bloodbankDictionary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve blood banks" });
  }
});

/**
 * Handle the GET request to retrieve all news.
 */
router.get("/news", async (req, res, next) => {
  try {
    const news = await db.News.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve news" });
  }
});

/**
 * Handle the GET request to retrieve all faq.
 */
router.get("/faq", async (req, res, next) => {
  try {
    const faq = await db.FAQ.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(faq);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve faq" });
  }
});

/**
 * Handle the POST request to add news.
 */
router.post("/addNews/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    const employee = await db.Employee.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!bloodBank && !employee) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    const { title, text, picture } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newNews = await db.News.create({
      title: title,
      text: text,
      picture: picture,
    });

    res.json(newNews.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add news" });
  }
});

/**
 * Handle the POST request to add FAQ.
 */
router.post("/addFAQ/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    const employee = await db.Employee.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!bloodBank && !employee) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFAQ = await db.FAQ.create({
      title: question,
      text: answer,
    });

    res.json(newFAQ.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add FAQ" });
  }
});

/**
 * Handle the GET request to retrieve all donors.
 */
router.get("/allDonors/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const donors = await db.Donor.findAll({});

    res.json(donors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve donors" });
  }
});

module.exports = router;
