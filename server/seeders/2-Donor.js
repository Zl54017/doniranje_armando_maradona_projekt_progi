"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const instituteNames = [
      "KBC Osijek",
      "KBC Rijeka",
      "KBC Split",
      "OB Dubrovnik",
      "OB Varaždin",
      "OB Zadar",
      "Hrvatski zavod za transfuzijsku medicinu Zagreb",
    ];

    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const names = [
      ["Luka Modrić", "M"],
      ["Mateo Kovačić", "M"],
      ["Andrej Kramarić", "M"],
      ["Ivan Rakitić", "M"],
      ["Mario Mandžukić", "M"],
      ["Davor Šuker", "M"],
      ["Kolinda Grabar-Kitarović", "F"],
      ["Zoran Milanović", "M"],
      ["Ivo Josipović", "M"],
      ["Stipe Mesić", "M"],
      ["Tonči Huljić", "M"],
      ["Severina Vučković", "F"],
      ["Vlatko Stefanovski", "M"],
      ["Oliver Dragojević", "M"],
      ["Marko Perković", "M"],
      ["Dino Dvornik", "M"],
      ["Igor Tudor", "M"],
      ["Slaven Bilić", "M"],
      ["Nenad Bjelica", "M"],
      ["Nikola Kalinić", "M"],
      ["Zvonimir Boban", "M"],
      ["Dražen Petrović", "M"],
      ["Davor Dominiković", "M"],
      ["Ivana Trump", "F"],
      ["Miroslav Blažević", "M"],
      ["Jozo Šimunović", "M"],
      ["Ivan Perišić", "M"],
      ["Šime Vrsaljko", "M"],
      ["Nikola Moro", "M"],
      ["Eduard Penkala", "M"],
      ["Zlatko Dalić", "M"],
      ["Branimir Glavaš", "M"],
      ["Dino Rađa", "M"],
      ["Ante Tomić", "M"],
      ["Josip Broz Tito", "M"],
      ["Vladimir Nazor", "M"],
      ["Ivo Karlović", "M"],
      ["Ivano Balić", "M"],
      ["Igor Štimac", "M"],
      ["Darijo Srna", "M"],
      ["Predrag Matvejević", "M"],
      ["Maksim Mrvica", "M"],
      ["Tereza Kesovija", "F"],
      ["Vladimir Putin", "M"],
      ["Elis Lovrić", "F"],
      ["Danijela Martinović", "F"],
      ["Mia Dimšić", "F"],
      ["Goran Ivanišević", "M"],
      ["Iva Majoli", "F"],
      ["Nina Badrić", "M"],
      ["Dražen Ladić", "M"],
      ["Vlatko Červar", "M"],
      ["Davor Bilman", "M"],
      ["Nikola Tesla", "M"],
      ["Miroslav Radman", "M"],
      ["Nives Celzijus", "F"],
      ["Duje Čop", "M"],
      ["Ivan Ljubičić", "M"],
      ["Jelena Rozga", "F"],
      ["Zdravko Mamić", "M"],
      ["Goran Bregović", "M"],
      ["Krešimir Ćosić", "M"],
      ["Dino Merlin", "M"],
      ["Davor Suker", "M"],
      ["Arsen Dedić", "M"],
      ["Nenad Milijaš", "M"],
      ["Ivica Kostelić", "M"],
      ["Ivana Brlić-Mažuranić", "F"],
      ["Josip Pupačić", "M"],
      ["Božo Vrećo", "M"],
      ["Duje Draganja", "M"],
      ["Miroslav Ćiro Blažević", "M"],
      ["Dinko Jukić", "M"],
      ["Ozren Nedeljković", "M"],
      ["Igor Mirović", "M"],
      ["Ratko Mladić", "M"],
      ["Nikolina Pišek", "F"],
      ["Dražen Zečić", "M"],
      ["Josip Manolić", "M"],
      ["Boris Novković", "M"],
      ["Vera Zima", "F"],
      ["Nikolina Ristović", "F"],
      ["Darko Kovačević", "M"],
      ["Vlado Gotovac", "M"],
      ["Josip Katalinski", "M"],
      ["Dino Ciani", "M"],
      ["Veljko Rogošić", "M"],
      ["Zdravko Kabić", "M"],
      ["Mladen Delić", "M"],
      ["Dalibor Čupić", "M"],
      ["Kruno Simon", "M"],
      ["Pero Galić", "M"],
      ["Petar Bieber Zuckerberg", "M"],
      ["Diego Armando Maradona", "M"],
      ["Miroslav Škoro", "M"],
    ];

    function getRandomAge(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const donors = [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i][0];

      donors.push({
        name: name,
        email: name.replace(/\s/g, "") + "@gmail.com",
        password:
          "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        age: getRandomAge(18, 65),
        gender:names[i][1],
        bloodType: bloodTypes[i % 8],
        transfusionInstitute: instituteNames[i % 7],
        numberOfDonations: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Donors", donors);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Donors", null, {});
  },
};
