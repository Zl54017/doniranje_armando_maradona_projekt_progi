"use strict";
const db = require("../models");
const Certificate = require("../models/certificate");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the names of the institutes

    const certificates = [];

    for (let i = 1; i < 97; i++) {
      certificates.push({
        name: "Pohvalnica",
        benefits: "Dobrodošli u klub darivatelja krvi!",
        numberOfDonations: 0,
        donorId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Certificates", certificates);
  },

  down: async (queryInterface, Sequelize) => {
    // Define the down migration if needed (for reverting the seeding)
    return queryInterface.bulkDelete("Certificates", null, {});
  },
};
