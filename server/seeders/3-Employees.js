"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const names = [
      "Renato Matić",
      "Martina Grubić",
      "Davorin Blažević",
      "Melita Kovačević",
      "Željko Pavlović",
      "Katarina Vlahović",
      "Branko Horvat",
      "Jasna Knežević",
      "Silvijo Jurić",
      "Daliborka Kovač",
      "Šime Šimić",
      "Anita Rukavina",
      "Renata Ivić",
      "Nikša Marinović",
    ];

    const employees = [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      employees.push({
        name: name,
        email: name.replace(/\s/g, "") + "@gmail.com",
        password:
          "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        bloodBankId: (i % 7) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Employees", employees);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Employees", null, {});
  },
};
