const axios = require("axios");

const address = "http://127.0.0.1:5000/";

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
  name,
  email,
  password,
  bloodType,
  transfusionInstitute
) {
  const url = address + "register";

  const requestBody = {
    name,
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

async function registerEmployee(name, email, password, bloodBankId) {
  const url = address + "employee/register";

  const requestBody = {
    name,
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

async function inventory(token) {
  const url = `${address}bloodbank/inventory/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function addDonation(token, donorId, warning, date) {
  const url = `${address}bloodbank/addDonation/${token}`;

  const requestBody = {
    donorId,
    warning,
    date,
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
    "Bruno Galić",
    "BrunoGalić@gmail.com",
    "password",
    "A+",
    "Hrvatski zavod za transfuzijsku medicinu Zagreb"
  );

  token = await registerEmployee(
    "Fran Galić",
    "FranGalić@gmail.com",
    "password",
    1
  );
}

//loginTest();
//registerTest();
