const axios = require("axios");

const address = "https://donationsbe.onrender.com/";

///Donor (sudionik) može:

//pristup osobnim podacima (ime, prezime, krvna grupa)
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

//pristup svojoj povijesti darivanja
async function donations(token) {
  const url = `${address}donor/donations/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//pristup informacijama o akcijama

//akcije za donorov zavod
async function actions(token) {
  const url = `${address}donor/actions/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//sve akcije
async function allActions() {
  const url = address + "donor/allActions";

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//pristup informacijama o količini krvi u pojedinim gradovima
async function bloodBanksInventory(token) {
  const url = `${address}donor/bloodBanksInventory/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//brisanje svog korisničkog računa
//trenutno se samo arhivira, a ne i briše, zbog donacija koje su već napravljene
async function archiveDonor(token) {
  const url = `${address}donor/delete/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//vidjeti koliki mu je period čekanja do sljedećeg darivanja
//trenutno u bazi nemamo spol, pa bih preporučio da samo piše nešto kao "broj dana od zadnje donacije"
//i onda da negdje piše nešto kao žene mogu donirati svakih 120, a muškarci 90 dana
//ali ako je potrebno mogu dodati spol u bazu
async function lastDonationDays(token) {
  const url = `${address}donor/lastDonationDays/${token}`;

  try {
    const response = await axios.post(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
//dodan gender u tablicu, pa sam dodao i ovu funkciju, uzeo sam podatak da zene moraju cekati 120, a muskarci 90 dana
//ova metoda vraca izracunat broj dana do sljedece donacije
async function daysUntilNextDonation(token) {
  const url = `${address}donor/daysUntilNextDonation/${token}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//prijava na akcije
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

//primanje obavijesti od zavoda u slučaju manjka krvi
//biti će implementirano po dogovoru

//potvrđivanje pozivnica za darivanje
//biti će implementirano po dogovoru

//pristup lokacijama na karti na kojima su organizirana doniranja krvi
//ovdje samo staviti adrese zavoda za pocetak?

//pozivanje gornjih funkcija
async function testForFE() {
  var token = await login("PeroGalić@gmail.com", "password");
  await donations(token);
  await actions(token);
  await allActions();
  await bloodBanksInventory(token);
  //await archiveDonor(token);
  await lastDonationDays(token);
  await daysUntilNextDonation(token);
  await actionRegistration(token, 5);
}

testForFE();

//pokretanje iz direktorija server: node DonorFunkcijeZaFE.js
