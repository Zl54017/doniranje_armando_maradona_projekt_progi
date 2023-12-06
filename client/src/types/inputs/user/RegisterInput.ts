// Zajednička svojstva za oba tipa
interface CommonRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Tip za korisnika
interface UserRegisterInput extends CommonRegisterInput {
  bloodType: string;
  transfusionCInstitute: string;
}

// Tip za zaposlenika
interface EmployeeRegisterInput extends CommonRegisterInput {
  // Dodajte svojstva specifična za zaposlenika ovdje
  bloodBankId: string;
}

// Unija tipova - registracija može biti ili za korisnika ili za zaposlenika
type RegisterInput = UserRegisterInput | EmployeeRegisterInput;

  
  export default RegisterInput;
  