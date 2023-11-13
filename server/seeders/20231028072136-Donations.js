"use strict";
const db = require("../models");
const Donor = require("../models/donor");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all donors from the database
    const donors = await db.Donor.findAll();

    // Create an array to store donation data
    const donations = [];

    // Initialize a base date (e.g., current date)
    let currentDate = new Date();

    // Define the interval between donations (3 months)
    const monthsInterval = 3;

    // Loop through each donor and create donation records
    donors.forEach((donor) => {
      // Create multiple donations, each 3 months apart
      for (let i = 0; i < donor.numberOfDonations; i++) {
        const donationDate = new Date(currentDate);
        // Set the donation date to be 3 months apart
        donationDate.setMonth(currentDate.getMonth() + i * monthsInterval);
        donationDate.setFullYear(currentDate.getFullYear() - 5);

        donations.push({
          date: donationDate,
          address: "Neka adresa", // Replace with the donor's address
          warning: "", // Replace with the warning message
          donorId: donor.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    // Insert the donation data into the database
    return queryInterface.bulkInsert("Donations", donations);
  },

  down: async (queryInterface, Sequelize) => {
    // Define the down migration if needed (for reverting the seeding)
    return queryInterface.bulkDelete("Donations", null, {});
  },
};
