const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const donor = require('./donor');
const redCross = require('./redcross');
const bloodBank = require('./bloodbank');

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });