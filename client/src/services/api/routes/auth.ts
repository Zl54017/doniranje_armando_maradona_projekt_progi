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
  getDonors: (jwt: LoginInput) => axios.get(`${auth.base}/bloodbank/filteredDonors?name=${jwt.transfusionInstitute}&donorName=${jwt.name}&bloodType=${jwt.bloodType}${jwt.password}&gender=${jwt.gender}&minAge=${jwt.age}&maxAge=${jwt.numberOfDonations}`),
  newAction: (action: any) => axios.post(`${auth.base}/bloodbank/createAction/`, action),
  getPreviousActions: (bloodBankId: number) => axios.get(`${auth.base}/bloodbank/bloodBankPastActions/${bloodBankId}`),
  getActiveActions: (bloodBankId: number) => axios.get(`${auth.base}/bloodbank/bloodBankActiveActions/${bloodBankId}`),
  getFaq: () => axios.get(`${auth.base}/bloodbank/faq`),
  postFaq: (jwt: string) => axios.post(`${auth.base}/bloodbank/addFAQ/${jwt}`),
  getAllBloodBanks: () => axios.get(`${auth.base}/bloodbank/allBloodBanks`),
  registerForAction: (jwt: string, action: any) => axios.post(`${auth.base}/donor/actionRegistration/${jwt}`, {actionId: action.id}),
  getBloodBankActionsForDonor: (bloodBankName: string) => axios.get(`${auth.base}/donor/allActions/${bloodBankName}`),
  getBloodBankEmployees: (jwt: string) => axios.get(`${auth.base}/bloodbank/employeesByBloodBank/${jwt}`),
  changePassword: (jwt: string, passwords: any) => axios.post(`${auth.base}/donor/changePassword/${jwt}`, {oldPassword: passwords.oldPassword, newPassword1: passwords.newPassword1, newPassword2: passwords.newPassword2}),
};
