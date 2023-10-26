class Donor {
  constructor(email, password) {
    this.email = email;
    this.password = password;

    var donorInformation = getDonorFromDatabase(email, password);

    this.id = donorInformation.id;
    this.name = donorInformation.name;
    this.bloodType = donorInformation.bloodType;
    this.transfusionInstitute = donorInformation.transfusionInstitute;

    this.donations = getDonorDonationsFromDatabase(id);
    this.numberOfDonations = this.donations.length;
    this.certificates = getDonorCertificatesFromDatabase(id);
  }

  requestCertificate() {
    addCertificateRequest(this.id, this.numberOfDonations);
  }
}

function getDonorFromDatabase(email, password) {
  return {
    name: "John Doe",
    email: "john@example.com",
    id: 12345,
    bloodType: "A+",
    transfusionInstitute: "Osijek",
  };
}

function getDonorDonationsFromDatabase(id) {
  return [
    {
      date: "1.1.2002.",
      address: "osijek",
      warning: "blood had too much poison",
    },
    {
      date: "1.5.2002.",
      address: "osijek",
      warning: "",
    },
  ];
}

function getDonorCertificatesFromDatabase(id) {
  return [
    {
      name: "Great job",
      numberOfDonations: 2,
      benefits: "free tickets for NK Bestovje",
    },
  ];
}

function addCertificateRequest(id, numberOfDonations) {
  //dodaj u bazu
}

const donors = [];

// Dodavanje novih donora
app.post("/donors", (req, res) => {
  const { id, name, bloodType, email, password } = req.body;
  const newDonor = new Donor(id, name, bloodType, email, password);
  donors.push(newDonor);
  res.status(201).json(newDonor);
});

// Dohvaćanje svih donora
app.get("/donors", (req, res) => {
  res.json(donors);
});
