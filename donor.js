class Donor {
    constructor(id, name, bloodType, email, password) {
      this.id = id;
      this.name = name;
      this.bloodType = bloodType;
      this.email = email;
      this.password = password;
      this.donations = [];
      this.bonuses = [];
    }
  
    addDonation(donation) {
      this.donations.push(donation);
    }
  
    requestBonus(bonus) {
      this.bonuses.push(bonus);
    }
  }
  
  const donors = [];
  
  // Dodavanje novih donora
  app.post('/donors', (req, res) => {
    const { id, name, bloodType, email, password } = req.body;
    const newDonor = new Donor(id, name, bloodType, email, password);
    donors.push(newDonor);
    res.status(201).json(newDonor);
  });
  
  // Dohvaćanje svih donora
  app.get('/donors', (req, res) => {
    res.json(donors);
  });