class BloodBank {
    constructor() {
      this.donors = [];
      this.actions = [];
    }
  
    registerDonor(donor) {
      this.donors.push(donor);
    }
  
    registerAction(action) {
      this.actions.push(action);
    }
  }
  
  const bloodBank = new BloodBank();
  
  // Dodavanje donora u zavod
  app.post('/bloodbanks/donors', (req, res) => {
    const { id, name, bloodType, email, password } = req.body;
    const newDonor = new Donor(id, name, bloodType, email, password);
    bloodBank.registerDonor(newDonor);
    res.status(201).json(newDonor);
  });
  
  // Registracija akcije u zavodu
  app.post('/bloodbanks/actions', (req, res) => {
    const { id, date, requiredBloodType, capacity, registrationDeadline } = req.body;
    const newAction = new Action(id, date, requiredBloodType, capacity, registrationDeadline);
    bloodBank.registerAction(newAction);
    res.status(201).json(newAction);
  });