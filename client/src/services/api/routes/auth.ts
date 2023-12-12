import axios from "axios";

import { endpoints } from "../endpoints";
import LoginInput from "../../../types/inputs/user/LoginInput";
import RegisterInput from "../../../types/inputs/user/RegisterInput";
import ActionInput from "../../../types/inputs/redcross/ActionInput";

const { auth } = endpoints;

export default {
  login: (user: LoginInput) => axios.post(`${auth.base}/login`, user),
  getUser: (jwt: string) => axios.get(`${auth.base}/login/${jwt}`),
  logout: () => axios.post(`${auth.base}/logout`, null),
  register: (user: RegisterInput) => axios.post(`${auth.base}/register`, user),
  actionset: (actionInput: ActionInput) => axios.post(`${auth.base}/bloodbank`, actionInput),
  getData: (jwt: string) => axios.post(`${auth.base}/login/${jwt}`),
};
