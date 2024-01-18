"use strict";
const db = require("../models");
const News = require("../models/news");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const news = [];

    news.push({
      title: "Početak rada nove web stranice",
      text: "Dobrodošli na novu web stranicu za darivanje krvi! Nadamo se da će vam se svidjeti. Ukoliko imate bilo kakvih pitanja ili problema, slobodno nas kontaktirajte. Hvala!",
      picture:
        "https://images.unsplash.com/photo-1524721696987-b9527df9e512?q=80&w=2233&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert("News", news);
  },

  down: async (queryInterface, Sequelize) => {
    // Define the down migration if needed (for reverting the seeding)
    return queryInterface.bulkDelete("News", null, {});
  },
};
