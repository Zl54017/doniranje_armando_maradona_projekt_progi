const axios = require("axios");

var address = "https://donationsbe.onrender.com/";
address = "http://localhost:5000/";

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
//dodao sam ovu metodu koja vraca kolicinu krvi za donorovu krvnu grupu
//to je ukupna zaliha u svim zavodima
//mislio sam da odredimo neku granicu, npr 50 litara, pa ako pozivom ove metode dobijemo manji broj
//prikazemo pop up na stranici koji kaze da bi donor trebao donirati ako moze
async function inventoryOfBloodType(token) {
  const url = `${address}donor/inventoryOfBloodType/${token}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//dohvat svih vijesti, od novijih prema starijima
async function getNews() {
  const url = `${address}bloodbank/news`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//dohvat svih često postavljenih pitanja
async function getFAQ() {
  const url = `${address}bloodbank/faq`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//dodavanje vijesti
async function addNews(token, title, text, picture) {
  const url = `${address}bloodbank/addNews/${token}`;

  const requestBody = {
    title,
    text,
    picture,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//dodavanje često postavljenih pitanja
async function addFAQ(token, question, answer) {
  const url = `${address}bloodbank/addFAQ/${token}`;

  const requestBody = {
    question,
    answer,
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

//potvrđivanje pozivnica za darivanje
//biti će implementirano po dogovoru

//pristup lokacijama na karti na kojima su organizirana doniranja krvi
//ovdje samo staviti adrese zavoda za pocetak?

//pozivanje gornjih funkcija
async function testForFE() {
  /** 
  var token = await login("PeroGalić@gmail.com", "password");
  await donations(token);
  await actions(token);
  await allActions();
  await bloodBanksInventory(token);
  await inventoryOfBloodType(token);
  //await archiveDonor(token);
  await lastDonationDays(token);
  await daysUntilNextDonation(token);
  await actionRegistration(token, 5);*/

  await getNews();
  await getFAQ();

  token = await login("ŠimeŠimić@gmail.com", "password");

  await addNews(
    token,
    "Proba",
    "Proba",
    "https://images.unsplash.com/photo-1524721696987-b9527df9e512?q=80&w=2233&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  await addFAQ(token, "Proba?", "Proba.");
}

testForFE();

//pokretanje iz direktorija server: node DonorFunkcijeZaFE.js
