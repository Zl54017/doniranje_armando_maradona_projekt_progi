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
      "Luka Modrić",
      "Mateo Kovačić",
      "Andrej Kramarić",
      "Ivan Rakitić",
      "Mario Mandžukić",
      "Davor Šuker",
      "Kolinda Grabar-Kitarović",
      "Zoran Milanović",
      "Ivo Josipović",
      "Stipe Mesić",
      "Tonči Huljić",
      "Severina Vučković",
      "Vlatko Stefanovski",
      "Oliver Dragojević",
      "Marko Perković",
      "Dino Dvornik",
      "Igor Tudor",
      "Slaven Bilić",
      "Nenad Bjelica",
      "Nikola Kalinić",
      "Ivica Olić",
      "Zvonimir Boban",
      "Dražen Petrović",
      "Davor Dominiković",
      "Ivana Trump",
      "Miroslav Blažević",
      "Jozo Šimunović",
      "Ivan Perišić",
      "Šime Vrsaljko",
      "Nikola Moro",
      "Eduard Penkala",
      "Zlatko Dalić",
      "Branimir Glavaš",
      "Dino Rađa",
      "Ante Tomić",
      "Josip Broz Tito",
      "Vladimir Nazor",
      "Ivo Karlović",
      "Ivano Balić",
      "Igor Štimac",
      "Darijo Srna",
      "Predrag Matvejević",
      "Maksim Mrvica",
      "Tereza Kesovija",
      "Vladimir Putin",
      "Elis Lovrić",
      "Danijela Martinović",
      "Mia Dimšić",
      "Goran Ivanišević",
      "Iva Majoli",
      "Nina Badrić",
      "Dražen Ladić",
      "Vlatko Červar",
      "Davor Bilman",
      "Nikola Tesla",
      "Miroslav Radman",
      "Nives Celzijus",
      "Duje Čop",
      "Ivan Ljubičić",
      "Jelena Rozga",
      "Zdravko Mamić",
      "Goran Bregović",
      "Krešimir Ćosić",
      "Dino Merlin",
      "Davor Suker",
      "Arsen Dedić",
      "Nenad Milijaš",
      "Ivica Kostelić",
      "Ivana Brlić-Mažuranić",
      "Josip Pupačić",
      "Božo Vrećo",
      "Duje Draganja",
      "Miroslav Ćiro Blažević",
      "Dinko Jukić",
      "Ozren Nedeljković",
      "Igor Mirović",
      "Ratko Mladić",
      "Nikolina Pišek",
      "Dražen Zečić",
      "Josip Manolić",
      "Boris Novković",
      "Vera Zima",
      "Nikolina Ristović",
      "Darko Kovačević",
      "Vlado Gotovac",
      "Josip Katalinski",
      "Dino Ciani",
      "Veljko Rogošić",
      "Zdravko Kabić",
      "Mladen Delić",
      "Dalibor Čupić",
      "Kruno Simon",
      "Pero Galić",
      "Petar Bieber Zuckerberg",
      "Diego Armando Maradona",
      "Miroslav Škoro",
    ];

    const donors = [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      donors.push({
        name: name,
        email: name.replace(/\s/g, "") + "@gmail.com",
        password:
          "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
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
