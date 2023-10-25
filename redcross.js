class RedCross {
    constructor() {
      this.donors = [];
      this.actions = [];
      this.certificates = [];
    }
  
    addDonor(donor) {
      this.donors.push(donor);
    }
  
    createAction(action) {
      this.actions.push(action);
    }
  
    issueCertificate(donor, certificate) {
      this.certificates.push({ donor, certificate });
    }
  
    sendInvitations(action, donors) {
      // Logika za slanje pozivnica donorima za akciju
    }
  }
  
  const redCross = new RedCross();
  
  // Dodavanje novih donora
  app.post('/donors', (req, res) => {
    const { id, name, bloodType, email, password } = req.body;
    const newDonor = new Donor(id, name, bloodType, email, password);
    redCross.addDonor(newDonor);
    res.status(201).json(newDonor);
  });
  
  // Kreiranje nove akcije
  app.post('/actions', (req, res) => {
    const { id, date, requiredBloodType, capacity, registrationDeadline } = req.body;
    const newAction = new Action(id, date, requiredBloodType, capacity, registrationDeadline);
    redCross.createAction(newAction);
    res.status(201).json(newAction);
  });