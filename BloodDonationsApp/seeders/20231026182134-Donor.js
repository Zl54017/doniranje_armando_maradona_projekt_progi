"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Donors", [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
        bloodType: "A+",
        transfusionInstitute: "OB Zadar",
        numberOfDonations: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        email: "janesmith@example.com",
        password: "securepass",
        bloodType: "B-",
        transfusionInstitute: "KBC Osijek",
        numberOfDonations: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bob Johnson",
        email: "bobjohnson@example.com",
        password: "pass123",
        bloodType: "AB+",
        transfusionInstitute: "KBC Rijeka",
        numberOfDonations: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Samantha Brown",
        email: "samanthabrown@example.com",
        password: "12345",
        bloodType: "O+",
        transfusionInstitute: "OB Dubrovnik",
        numberOfDonations: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "David Lee",
        email: "davidlee@example.com",
        password: "p@ssw0rd",
        bloodType: "A-",
        transfusionInstitute: "KBC Split",
        numberOfDonations: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Emily White",
        email: "emilywhite@example.com",
        password: "mysecret",
        bloodType: "B+",
        transfusionInstitute: "OB Varaždin",
        numberOfDonations: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael Green",
        email: "michaelgreen@example.com",
        password: "green123",
        bloodType: "O-",
        transfusionInstitute: "OB Zadar",
        numberOfDonations: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Olivia Davis",
        email: "oliviadavis@example.com",
        password: "davis456",
        bloodType: "AB-",
        transfusionInstitute: "Hrvatski zavod za transfuzijsku medicinu Zagreb",
        numberOfDonations: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "William Taylor",
        email: "williamtaylor@example.com",
        password: "taylorpass",
        bloodType: "A+",
        transfusionInstitute: "KBC Osijek",
        numberOfDonations: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Donors", null, {});
  },
};
