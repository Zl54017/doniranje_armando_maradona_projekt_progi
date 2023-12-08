const axios = require("axios");

const address = "https://donationsbe.onrender.com/";

async function login(email, password) {
  const url = address + "login";

  const requestBody = {
    email,
    password,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
    const { token } = response.data;
    return token;
  } catch (error) {
    console.error(error);
  }
}

async function register(
  firstName,
  lastName,
  email,
  password,
  bloodType,
  transfusionInstitute
) {
  const url = address + "register";

  const requestBody = {
    firstName,
    lastName,
    email,
    password,
    bloodType,
    transfusionInstitute,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
    const { token } = response.data;
    return token;
  } catch (error) {
    console.error(error);
  }
}

async function registerEmployee(firstName, lastName, email, password, bloodBankId) {
  const url = address + "employee/register";

  const requestBody = {
    firstName,
    lastName,
    email,
    password,
    bloodBankId,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
    const { token } = response.data;
    return token;
  } catch (error) {
    console.error(error);
  }
}

async function donations(token) {
  const url = `${address}donor/donations/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function archiveDonor(token) {
  const url = `${address}donor/delete/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function actions(token) {
  const url = `${address}donor/actions/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function allActions() {
  const url = address + "donor/allActions";

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function actionRegistration(token, actionId) {
  const url = `${address}donor/actionRegistration/${token}`;

  const requestBody = {
    actionId,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function lastDonationDays(token) {
  const url = `${address}donor/lastDonationDays/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function inventory(token) {
  const url = `${address}bloodbank/inventory/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function addDonation(token, donorId, warning, date, addressOfDonation) {
  const url = `${address}bloodbank/addDonation/${token}`;

  const requestBody = {
    donorId,
    warning,
    date,
    address: addressOfDonation,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function registrations(actionId) {
  const url = address + "bloodbank/registrations";

  const requestBody = {
    actionId,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function allBloodBanks() {
  const url = address + "bloodbank/allBloodBanks";

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function bloodBanksInventory(token) {
  const url = `${address}donor/bloodBanksInventory/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function TEST() {
  var token = await login("johndoe@example.com", "password123");

  await donations(token);

  await actions(token);

  await allActions();

  await actionRegistration(token, 3);

  token = await login("b", "b");

  await inventory(token);

  await addDonation(token, 1, "", new Date());

  await registrations(3);

  token = await register(
    "armando",
    "2",
    "sifra",
    "A+",
    "Hrvatski zavod za transfuzijsku medicinu Zagreb"
  );
}

async function loginTest() {
  var token = await login("RenatoMatić@gmail.com", "password");

  var token = await login("KBCOsijek@gmail.com", "password");

  var token = await login("LukaModrić@gmail.com", "password");
}

async function registerTest() {
  token = await register(
    "Bruno",
    "Galić",
    "BrunoGalić@gmail.com",
    "password",
    "A+",
    "Hrvatski zavod za transfuzijsku medicinu Zagreb"
  );

  token = await registerEmployee(
    "Fran",
    "Galić",
    "FranGalić@gmail.com",
    "password",
    1
  );
}

async function addDonations() {

  const instituteNames = [
    "KBC Osijek",
    "KBC Rijeka",
    "KBC Split",
    "OB Dubrovnik",
    "OB Varaždin",
    "OB Zadar",
    "Hrvatski zavod za transfuzijsku medicinu Zagreb",
  ];

  const addresses = [
    "Ul. Josipa Huttlera 4, 31000, Osijek",
    "Krešimirova ul. 42, 51000, Rijeka",
    "Spinčićeva ul. 1, 21000, Split",
    "Dr. Roka Mišetića 2, 20000, Dubrovnik",
    "Ul. Ivana Meštrovića 1, 42000, Varaždin",
    "Ul. Bože Peričića 5, 23000, Zadar",
    "Petrova ul. 3, 10000, Zagreb",
  ];


  
  for (var i = 1; i < 97; i++) {
    var token = await login(instituteNames[(i-1) % 7].replace(/\s/g, "") + "@gmail.com", "password");
    for (var j = 1; j < 6; j++) {
      var date = new Date();
      date.setMonth(date.getMonth() - 3 * j);
      await addDonation(token, i, "", date, addresses[(i - 1) % 7]);
    }
  }
}


async function inventoryTest() {
  const instituteNames = [
    "KBC Osijek",
    "KBC Rijeka",
    "KBC Split",
    "OB Dubrovnik",
    "OB Varaždin",
    "OB Zadar",
    "Hrvatski zavod za transfuzijsku medicinu Zagreb",
  ];

  for (var i = 0; i < 7; i++) {
    var token = await login(
      instituteNames[i].replace(/\s/g, "") + "@gmail.com",
      "password"
    );
    await inventory(token);
  }
  var token = await login("DinoCiani@gmail.com", "password");
  await donations(token);
  bloodBanksInventory(token);
  lastDonationDays(token);
}

async function loginTest() {
  var token = await login("ProbaArhive@gmail.com (archived)", "password");

}



async function actionsTest() {
  var token = await login("DinoCiani@gmail.com", "password");

  await actionRegistration(token,2);

  await actions(token);
}

actionsTest();

async function testForFE() { 
  var token = await login("DinoCiani@gmail.com", "password");
}