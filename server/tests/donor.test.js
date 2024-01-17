const request = require("supertest");
const app = require("../server.js");

const axios = require("axios");
var address = "https://donationsbe.onrender.com/";
address = "http://localhost:5000/";

/**
 * Function that tests the login endpoint.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {string} The token of the user.
 * @throws {Error} If the login fails.
 */
async function login(email, password) {
  const url = address + "login";
  const requestBody = {
    email,
    password,
  };
  const response = await axios.post(url, requestBody);
  const { token } = response.data;
  return token;
}

/**
 * A test suite for the login endpoint.
 */
describe("login", () => {
  it("should return the token", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      expect(token.length).toBeGreaterThan(0);
    } catch (error) {
      fail(error);
    }
  }, 10000);

  it("should handle errors", async () => {
    try {
      const token = await login("PeroGalic@gmail.com", "password");
      fail("Expected an error, but the function didn't throw.");
    } catch (error) {
      console.log(error.message);
      expect(error.message.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Function for testing the daysUntilNextDonation endpoint.
 *
 * @param {string} token - The token of the user.
 * @returns {number} The days until the next donation.
 * @throws {Error} If the function fails.
 */
async function daysUntilNextDonation(token) {
  const url = `${address}donor/daysUntilNextDonation/${token}`;
  const response = await axios.get(url);
  return response.data;
}

/**
 * A test suite for the daysUntilNextDonation endpoint.
 */
describe("daysUntilNextDonation", () => {
  it("should return the days until the next donation", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      const response = await daysUntilNextDonation(token);
      expect(response).toHaveProperty("daysUntilNextDonation");
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });

  it("should handle errors", async () => {
    try {
      const token = "nes";
      await daysUntilNextDonation(token);
      fail("Expected an error, but the function didn't throw.");
    } catch (error) {
      console.log(error.message);
      expect(error.message.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Function for testing the donations endpoint.
 *
 * @param {string} token - The token of the user.
 * @returns {Array} The donations of the user.
 * @throws {Error} If the function fails.
 */
async function donations(token) {
  const url = `${address}donor/donations/${token}`;
  const response = await axios.post(url);
  return response.data;
}

/**
 * A test suite for the donations endpoint.
 */
describe("donations", () => {
  it("should return the donations", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      const response = await donations(token);
      expect(response.length).toBeGreaterThan(0);
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });

  it("should handle errors", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      await donations(token.slice(0, -1));
      fail("Expected an error, but the function didn't throw.");
    } catch (error) {
      console.log(error.message);
      expect(error.message.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Function for testing the actions endpoint.
 *
 * @param {string} token - The token of the user.
 * @returns {Array} The actions of the user.
 * @throws {Error} If the function fails.
 */
async function actions(token) {
  const url = `${address}donor/actions/${token}`;
  const response = await axios.post(url);
  return response.data;
}

/**
 * A test suite for the actions endpoint.
 */
describe("actions", () => {
  it("should return the actions", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      const response = await actions(token);
      expect(response.length).toBeGreaterThan(0);
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });

  it("should handle errors", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      await actions(token.slice(0, -2));
      fail("Expected an error, but the function didn't throw.");
    } catch (error) {
      console.log(error.message);
      expect(error.message.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Function for testing the bloodBanksInventory endpoint.
 *
 * @param {string} token - The token of the user.
 * @returns {Object} The blood banks inventory.
 * @throws {Error} If the function fails.
 */
async function bloodBanksInventory(token) {
  const url = `${address}donor/bloodBanksInventory/${token}`;
  const response = await axios.post(url);
  return response.data;
}

/**
 * A test suite for the bloodBanksInventory endpoint.
 */
describe("bloodBanksInventory", () => {
  it("should return the blood banks inventory", async () => {
    try {
      const token = await login("KBCOsijek@gmail.com", "password");
      const response = await bloodBanksInventory(token);
      expect(response).toHaveProperty("OB Varaždin");
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });

  it("should handle errors", async () => {
    try {
      const token = await login("KBCOsijek@gmail.com", "password");
      await bloodBanksInventory(token.slice(0, -2));
      fail("Expected an error, but the function didn't throw.");
    } catch (error) {
      console.log(error.message);
      expect(error.message.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Function for testing the allActions endpoint for KBC Osijek.
 *
 * @returns {Array} The actions of the blood bank.
 * @throws {Error} If the function fails.
 */
async function allActions() {
  const url = address + "donor/allActions/KBC Osijek";
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
}

/**
 * A test suite for the allActions endpoint.
 */
describe("allActions", () => {
  it("should return all actions", async () => {
    try {
      const response = await allActions();
      expect(response.length).toBeGreaterThan(0);
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });
});

/**
 * Function for testing the lastDonationDays endpoint.
 *
 * @param {string} token - The token of the user.
 * @returns {number} The days since the last donation.
 * @throws {Error} If the function fails.
 */
async function lastDonationDays(token) {
  const url = `${address}donor/lastDonationDays/${token}`;
  const response = await axios.post(url);
  return response.data;
}

/**
 * A test suite for the lastDonationDays endpoint.
 */
describe("lastDonationDays", () => {
  it("should return the last donation days", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      const response = await lastDonationDays(token);
      expect(response).toHaveProperty("daysSinceLastDonation");
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });

  it("should handle errors", async () => {
    try {
      const token = "nes";
      await lastDonationDays(token);
      fail("Expected an error, but the function didn't throw.");
    } catch (error) {
      console.log(error.message);
      expect(error.message.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Function for testing the inventoryOfBloodType endpoint.
 *
 * @param {string} token - The token of the user.
 * @returns {number} The inventory of blood type.
 * @throws {Error} If the function fails.
 */
async function inventoryOfBloodType(token) {
  const url = `${address}donor/inventoryOfBloodType/${token}`;
  const response = await axios.get(url);
  return response.data;
}

/**
 * A test suite for the inventoryOfBloodType endpoint.
 */
describe("inventoryOfBloodType", () => {
  it("should return the inventory of blood type", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      const response = await inventoryOfBloodType(token);
      expect(response).toBeGreaterThan(0);
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });

  it("should handle errors", async () => {
    try {
      const token = await login("LukaModrić@gmail.com", "password");
      await inventoryOfBloodType(token.slice(0, -2));
      fail("Expected an error, but the function didn't throw.");
    } catch (error) {
      console.log(error.message);
      expect(error.message.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Function for testing the news endpoint.
 *
 * @returns {Array} The news.
 * @throws {Error} If the function fails.
 */
async function getNews() {
  const url = `${address}bloodbank/news`;
  const response = await axios.get(url);
  return response.data;
}

/**
 * A test suite for the news endpoint.
 */
describe("getNews", () => {
  it("should return the news", async () => {
    try {
      const response = await getNews();
      console.log();
      expect(response.length).toBeGreaterThan(0);
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });
});

/**
 * Function for testing the FAQ endpoint.
 *
 * @returns {Array} The FAQ.
 * @throws {Error} If the function fails.
 */
async function getFAQ() {
  const url = `${address}bloodbank/faq`;
  const response = await axios.get(url);
  return response.data;
}

/**
 * A test suite for the FAQ endpoint.
 */
describe("getFAQ", () => {
  it("should return the FAQ", async () => {
    try {
      const response = await getFAQ();
      console.log();
      expect(response.length).toBeGreaterThan(0);
    } catch (error) {
      console.error(error);
      fail(error);
    }
  });
});
