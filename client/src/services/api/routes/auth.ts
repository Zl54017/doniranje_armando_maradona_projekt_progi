import axios from "axios";

import { endpoints } from "../endpoints";
import LoginInput from "../../../types/inputs/user/LoginInput";
import RegisterInput from "../../../types/inputs/user/RegisterInput";
import ActionInput from "../../../types/inputs/redcross/ActionInput";
import bloodBankInfo from "../../../types/inputs/user/bloodBankInfo";

const { auth } = endpoints;

export default {
  login: (user: LoginInput) => axios.post(`${auth.base}/login`, user),
  getUser: (jwt: string) => axios.get(`${auth.base}/login/${jwt}`),
  logout: () => axios.post(`${auth.base}/logout`, null),
  register: (user: RegisterInput) => axios.post(`${auth.base}/register`, user),
  actionset: (actionInput: ActionInput) => axios.post(`${auth.base}/bloodbank`, actionInput),
  getData: (jwt: string) => axios.post(`${auth.base}/login/${jwt}`),
  delete: (jwt: string) => axios.post(`${auth.base}/donor/delete/${jwt}`),
  change: (user: RegisterInput, jwt: string) => axios.post(`${auth.base}/donor/change/${jwt}`, user),
  getAction: (jwt: string) => axios.post(`${auth.base}/donor/actions/${jwt}`),
  getPrevAction: (jwt: string) => axios.post(`${auth.base}/donor/donations/${jwt}`),
  getAwards: (jwt: string) => axios.post(`${auth.base}/donor/awards/${jwt}`),
  getEmployeeDonors: (bloodBankId: string) => axios.get(`${auth.base}/bloodbank/donorsByBloodBank/${bloodBankId}`),
  newAction: (action: bloodBankInfo, jwt: string) => axios.post(`${auth.base}/bloodbank/actions/createAction/${jwt}`, action),
  getPreviousActions: (bloodBankId: number) => axios.get(`${auth.base}/bloodbank/bloodBankPastActions/${bloodBankId}`),
  getActiveActions: (bloodBankId: number) => axios.get(`${auth.base}/bloodbank/bloodBankActiveActions/${bloodBankId}`),
};
