// Zajednička svojstva za oba tipa
interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bloodType: string;
  transfusionInstitute: string;
  gender: string;
  age: number;
}

export default RegisterInput;