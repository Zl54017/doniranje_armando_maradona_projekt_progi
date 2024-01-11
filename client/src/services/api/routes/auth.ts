import axios from "axios";

import { endpoints } from "../endpoints";
import LoginInput from "../../../types/inputs/user/LoginInput";
import RegisterInput from "../../../types/inputs/user/RegisterInput";
import ActionInput from "../../../types/inputs/redcross/ActionInput";
import bloodBankInfo from "../../../types/inputs/user/bloodBankInfo";
import Employee from "../../../types/inputs/bloodbank/Employee";

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
  getAllBloodBanks: () => axios.get(`${auth.base}/bloodbank/allBloodBanks`),
  registerForAction: (jwt: string, action: any) => axios.post(`${auth.base}/donor/actionRegistration/${jwt}`, { actionId: action.id }),
  getBloodBankActionsForDonor: (bloodBankName: string) => axios.get(`${auth.base}/donor/allActions/${bloodBankName}`),
  getBloodBankEmployees: (jwt: string) => axios.get(`${auth.base}/bloodbank/employeesByBloodBank/${jwt}`),
  deleteDonorById: (jwt: string) => axios.delete(`${auth.base}/bloodbank/deleteDonor/${jwt}`),
  deleteEmployeeById: (jwt: string) => axios.delete(`${auth.base}/bloodbank/deleteEmployee/${jwt}`),
  addEmployee: (user: Employee) => axios.post(`${auth.base}/bloodbank/addEmployee`, user),
  changePassword: (jwt: string, passwords: any) => axios.post(`${auth.base}/donor/changePassword/${jwt}`, { oldPassword: passwords.oldPassword, newPassword1: passwords.newPassword1, newPassword2: passwords.newPassword2 }),
  getBloodBank: () => axios.get(`${auth.base}/bloodbank/allBloodBanks`),
  getBloodBankDetails: (jwt: string) => axios.get(`${auth.base}/employee/employeeBloodBankDetails/${jwt}`),
  deleteFAQ: (faqId: string) => axios.delete(`${auth.base}/bloodbank/deleteFAQ/${faqId}`),
  getFAQ: () => axios.get(`${auth.base}/bloodbank/faq`),
  postFAQ: (jwt: string, body: any) => axios.post(`${auth.base}/bloodbank/addFAQ/${jwt}`, body),
  deleteNews: (newsId: string) => axios.delete(`${auth.base}/bloodbank/deleteNews/${newsId}`),
  getNews: () => axios.get(`${auth.base}/bloodbank/news`),
  postNews: (jwt: string, newNews: any) => axios.post(`${auth.base}/bloodbank/addNews/${jwt}`, newNews),
  getBloodTypeInv: (bloodType: string, body: any) => axios.get(`${auth.base}/bloodbank/inventory/${bloodType}`, body),
  getAllDonors: (jwt: string)=> axios.get(`${auth.base}/bloodbank/allDonors/${jwt}`),
  getAllInventory: (jwt: string)=> axios.get(`${auth.base}/bloodbank/allInventory/${jwt}`)
};
