import { ROLE } from "../../enums/Role";
import User from "../../models/User";

interface AuthUser {
  user: User;
  token: string;
  role: ROLE;
}

export default AuthUser;
