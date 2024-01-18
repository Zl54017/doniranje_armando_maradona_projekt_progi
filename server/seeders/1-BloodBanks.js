"use strict";
const db = require("../models");
const Donor = require("../models/donor");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the names of the institutes
    const instituteNames = [
      "KBC Osijek",
      "KBC Rijeka",
      "KBC Split",
      "OB Dubrovnik",
      "OB Varaždin",
      "OB Zadar",
      "Hrvatski zavod za transfuzijsku medicinu Zagreb",
    ];

    const address = [
      "Ul. Josipa Huttlera 4, 31000, Osijek",
      "Krešimirova ul. 42, 51000, Rijeka",
      "Spinčićeva ul. 1, 21000, Split",
      "Dr. Roka Mišetića 2, 20000, Dubrovnik",
      "Ul. Ivana Meštrovića 1, 42000, Varaždin",
      "Ul. Bože Peričića 5, 23000, Zadar",
      "Petrova ul. 3, 10000, Zagreb",
    ];

    const bloodBanks = [];

    for (let i = 0; i < instituteNames.length; i++) {
      const instituteName = instituteNames[i];
      const instituteAddress = address[i];

      bloodBanks.push({
        name: instituteName,
        address: instituteAddress, // Use the corresponding address
        numberOfDonors: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: instituteName.replace(/\s/g, "") + "@gmail.com",
        password:
          "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      });
    }

    // Insert the blood bank data into the database
    return queryInterface.bulkInsert("BloodBanks", bloodBanks);
  },

  down: async (queryInterface, Sequelize) => {
    // Define the down migration if needed (for reverting the seeding)
    return queryInterface.bulkDelete("BloodBanks", null, {});
  },
};
