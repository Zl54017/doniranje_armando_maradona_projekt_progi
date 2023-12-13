"use strict";
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

    const actions = [];

    for (let i = 0; i < instituteNames.length; i++) {
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

        actions.push({
          bloodBankId: i + 1,
          address: address[i],
          date: sixMonthsLater,
          minNumberOfDonors: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    }

    return queryInterface.bulkInsert("Actions", actions);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Actions", null, {});
  },
};
