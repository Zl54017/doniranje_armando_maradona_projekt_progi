const axios = require("axios");

const address = "http://127.0.0.1:3000/";

async function login(email, password) {
  const url = address + "login";

  const requestBody = {
    email,
    password,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
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
  } catch (error) {
    console.error(error);
  }
}

async function donations(email, password) {
  const url = address + "donor/donations";

  const requestBody = {
    email,
    password,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function actions(email, password) {
  const url = address + "donor/actions";

  const requestBody = {
    email,
    password,
  };

  try {
    const response = await axios.post(url, requestBody);
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

async function actionRegistration(actionId, donorId) {
  const url = address + "donor/actionRegistration";

  const requestBody = {
    actionId,
    donorId,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function inventory(email, password) {
  const url = address + "bloodbank/inventory";

  const requestBody = {
    email,
    password,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function addDonation(email, password, donorId, warning, date) {
  const url = address + "bloodbank/addDonation";

  const requestBody = {
    email,
    password,
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

async function TEST() {
  await login("b", "b");

  await login("johndoe@example.com", "password123");

  await register(
    "bruno",
    "mail",
    "sifra",
    "A+",
    "Hrvatski zavod za transfuzijsku medicinu Zagreb"
  );

  await donations("janesmith@example.com", "securepass");

  await actions("janesmith@example.com", "securepass");

  await allActions();

  await actionRegistration(3, 3);

  await inventory("zagreb", "zagreb");

  await addDonation("b", "b", 1, "", new Date());

  await registrations(3);
}

TEST();
