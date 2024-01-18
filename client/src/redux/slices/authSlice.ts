import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginInput from "../../types/inputs/user/LoginInput";
import authService from "../../services/api/routes/auth";
import localStorageUtility from "../../utils/localStorage/auth";
import AuthUser from "../../types/inputs/user/AuthUser";
import { ROLE } from "../../types/enums/Role";
import { create } from "domain";
import RegisterInput from "../../types/inputs/user/RegisterInput";
import { ListAction } from "@mui/base/useList";
import bloodBankInfo from "../../types/inputs/user/bloodBankInfo";
import Employee from "../../types/inputs/bloodbank/Employee";

interface AuthState {
  user: LoginInput | undefined;
  role: ROLE | undefined;
  action: bloodBankInfo | undefined;
}

const initialState: AuthState = {
  user: undefined,
  role: undefined,
  action: undefined,
};

const attemptLogin = createAsyncThunk(
  "auth/loginStatus",
  async (user: LoginInput) => {
    const response = await authService.login(user);
    return response.data;
  }
);

const attemptRegister = createAsyncThunk(
  "auth/registerStatus",
  async (user: RegisterInput) => {
    const response = await authService.register(user);
    return response.data;
  }
);

const attemptAddEmployee = createAsyncThunk(
  "auth/addEmployeeStatus",
  async (user: any) => {
    const employee = {
      name: user.name,
      email: user.email,
      password: user.password,
      bloodBankId: user.bloodBankId,
    }
    const response = await authService.addEmployee(employee);
    return response.data;
  }
);

const attemptDelete = createAsyncThunk(
  "auth/deleteStatus",
  async () => {
    const token = localStorageUtility.getAuthToken();
    if (token) {
      const response = await authService.delete(token);
      return response.data
    }
  }
);

const attemptChange = createAsyncThunk(
  "auth/changeStatus",
  async (user: RegisterInput) => {
    const token = localStorageUtility.getAuthToken();
    if (token) {
      const response = await authService.change(user, token);
      return response.data
    }
  }
);

const attemptNewAction = createAsyncThunk(
  "auth/newActionStatus",
  async (action: any) => {
    const response = await authService.newAction(action);
    return response.data
  }
);

const attemptRegistered = createAsyncThunk(
  "auth/registeredStatus",
  async (actionId: any) => {
    const response = await authService.getRegistered(actionId);
    return response.data;
  }
);

const retrieveActions = createAsyncThunk(
  "auth/retrieveActionsStatus",
  async () => {
    const token = localStorageUtility.getAuthToken();
    if (token) {
      const response = await authService.getAction(token);
      return response.data;
    }
  }
);

const retrievePrevActions = createAsyncThunk(
  "auth/retrievePrevActionsStatus",
  async () => {
    const token = localStorageUtility.getAuthToken();
    if (token) {
      const response = await authService.getPrevAction(token);
      return response.data;
    }
  }
);

const retrieveAwards = createAsyncThunk(
  "auth/retrieveAwardsStatus",
  async () => {
    const token = localStorageUtility.getAuthToken();
    if (token) {
      const response = await authService.getAwards(token);
      return response.data;
    }
  }
);


const fetchData = createAsyncThunk("auth/fetchDataStatus", async () => {
  const token = localStorageUtility.getAuthToken();
  if (token !== null) {
    const response = await authService.getData(token);
    return response.data;
  }
});

const attemptRegisterForAction = createAsyncThunk("auth/registerForActionStatus", async (action: any) => {
  const token = localStorageUtility.getAuthToken();
  if (token !== null) {
    const response = await authService.registerForAction(token, action);
    return response.data;
  }
});

const attempChangePassword = createAsyncThunk("auth/changePasswordStatus", async (passwords: any) => {
  const token = localStorageUtility.getAuthToken();
  if (token !== null) {
    const response = await authService.changePassword(token, passwords);
    return response.data;
  }
})

const attemptGetBloodBankActionsForDonor = createAsyncThunk("auth/getBloodBankActionsForDonorStatus", async (bloogBankName: string) => {
  const response = await authService.getBloodBankActionsForDonor(bloogBankName);
  return response.data;
})

const fetchUser = createAsyncThunk("auth/fetchUserStatus", async () => {
  const token = localStorageUtility.getAuthToken();
  if (token !== null) {
    const response = await authService.getUser(token);
    return response.data;
  }
});

const attemptLogout = createAsyncThunk("auth/logoutStatus", async () => {
  const response = await authService.logout();
  return response.data;
});

const attemptGetDonors = createAsyncThunk("auth/getDonorsStatus",
  async (user: any) => {
    const response = await authService.getDonors(user);
    return response.data;
  });

const attemptGetPreviousActions = createAsyncThunk(
  "auth/getPreviousActionsStatus",
  async (bloodbankId: any) => {
    const response = await authService.getPreviousActions(bloodbankId);
    return response.data;
  }
);

const attemptGetBloodBankDetails = createAsyncThunk(
  "auth/getBloodBankDetailsStatus", async () => {
    const token = localStorageUtility.getAuthToken();
    if (token !== null) {
      const response = await authService.getBloodBankDetails(token);
      return response.data;
    }
  }
);

const attemptGetBloodBank2 = createAsyncThunk(
  "auth/getBloodBankStatus",
  async () => {
    const response = await authService.getBloodBank2();
    return response.data;
  }
);

const attemptGetBloodBank = createAsyncThunk(
  "auth/getBloodBankStatus",
  async () => {
    const response = await authService.getBloodBank();
    return response.data;
  }
);
const attemptGetActiveActions = createAsyncThunk(
  "auth/getActiveActionsStatus",
  async (bloodbankId: any) => {
    const response = await authService.getActiveActions(bloodbankId);
    return response.data;
  }
);

const attemptGetAllBloodBanks = createAsyncThunk(
  "auth/getAllBloodBanksStatus",
  async () => {
    const response = await authService.getAllBloodBanks();
    return response.data;
  }
);

const attemptGetBloodTypeInv = createAsyncThunk(
  "auth/getBloodTypeInvStatus", async (user: any) => {
    const body = {
      email: user.email,
      password: user.password,
    }
    const response = await authService.getBloodTypeInv("A+", body);
    return response.data;
  }
)

const attemptGetBloodBankEmployees = createAsyncThunk(
  "auth/getBloodBankEmployeesStatus",
  async (name: string) => {
    const response = await authService.getBloodBankEmployees(name);
    return response.data;
  }
);

const attemptDeleteDonorById = createAsyncThunk(
  "auth/deleteDonorByIdStatus",
  async (id: string) => {
    const response = await authService.deleteDonorById(id);
    return response.data;
  }
);
const attemptDeleteEmployeeById = createAsyncThunk(
  "auth/deleteEmployeeByIdStatus",
  async (id: string) => {
    const response = await authService.deleteEmployeeById(id);
    return response.data;
  }
);

const attemptDeleteFAQ = createAsyncThunk(
  "auth/deleteFAQStatus", async (faqId: string) => {
    const token = localStorageUtility.getAuthToken();
    if(token){
      const body = {
        faqId: faqId,
      }
      const response = await authService.deleteFAQ(token, body);
      return response.data;
    }
  }
);

const attemptGetFAQ = createAsyncThunk(
  "auth/getFAQStatus", async () => {
    const response = await authService.getFAQ();
    return response.data;
  }
);

const attemptPostFAQ = createAsyncThunk(
  "auth/postFAQStatus", async (question: any) => {
    const token = localStorageUtility.getAuthToken();
    if (token !== null) {
      const response = await authService.postFAQ(token, question);
      return response.data;
    }
  }
);

const attemptEditedFAQ = createAsyncThunk(
  "auth/editFAQStatus", async (question: any) => {
    const faq = {
      question: question.question,
      answer: question.answer,
    }
    const response = await authService.editFAQ(question.id, faq);
    return response.data;
  }
);


const attemptDeleteNews = createAsyncThunk(
  "auth/deleteNewsStatus", async (newsId: string) => {
    const token = localStorageUtility.getAuthToken();
    if(token){
      const body = {
        newsId: newsId,
      }
      const response = await authService.deleteNews(token, body);
      return response.data;
    }
  }
);

const attemptGetNews = createAsyncThunk(
  "auth/getNewsStatus", async () => {
    const response = await authService.getNews();
    return response.data;
  }
);

const attemptGetAllDonors = createAsyncThunk(
  "auth/getAllDonorsStatus", async () => {
    const token = localStorageUtility.getAuthToken();
    if (token !== null) {
      const response = await authService.getAllDonors(token);
      return response.data;
    }
  }
);

const attemptGetAllInventory = createAsyncThunk(
  "auth/getAllInventoryStatus", async () => {
    const token = localStorageUtility.getAuthToken();
    if (token !== null) {
      const response = await authService.getAllInventory(token);
      return response.data;
    }
  }
);


const attemptPostNews = createAsyncThunk(
  "auth/postNewsStatus", async (newNews: any) => {
    const token = localStorageUtility.getAuthToken();
    if (token !== null) {
      const response = await authService.postNews(token, newNews);
      return response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state, action: PayloadAction<undefined>) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      attemptLogin.fulfilled,
      (state, action: PayloadAction<AuthUser>) => {
        const payload = action.payload;
        localStorageUtility.setAuthToken(payload.token);

        state.user = payload.user;
        state.role = payload.role;
      }
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log(action.error);
    });

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<AuthUser>) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
      }
    );

    builder.addCase(
      attemptDelete.fulfilled,
      (state, action: PayloadAction<undefined>) => {
        localStorageUtility.clearAuthToken();
        state.user = undefined;
        state.role = undefined;
      }
    );

    builder.addCase(
      attemptLogout.fulfilled,
      (state, action: PayloadAction<undefined>) => {
        localStorageUtility.clearAuthToken();
        state.user = undefined;
        state.role = undefined;
      }
    );

    builder.addCase(
      attemptRegister.fulfilled,
      (state, action: PayloadAction<AuthUser>) => {
        const payload = action.payload;
        localStorageUtility.setAuthToken(payload.token);
        state.user = payload.user;
        state.role = payload.role;
      }
    );

    builder.addCase(
      attemptChange.fulfilled,
      (state, action: PayloadAction<AuthUser>) => {
        const payload = action.payload;
        state.user = payload.user;
        state.role = payload.role;
      }
    );
  },
});

export const { clearUser } = authSlice.actions;

export { attemptGetBloodBank2, attemptRegistered, attemptGetBloodTypeInv, attemptGetBloodBankDetails, attemptGetBloodBank, attempChangePassword, attemptAddEmployee, attemptDeleteDonorById, attemptDeleteEmployeeById, attemptGetBloodBankActionsForDonor, attemptGetBloodBankEmployees, attemptRegisterForAction, attemptGetDonors, attemptGetAllBloodBanks, retrieveAwards, retrievePrevActions, retrieveActions, attemptChange, attemptLogin, fetchUser, attemptLogout, attemptRegister, fetchData, attemptDelete, attemptNewAction, attemptGetActiveActions, attemptGetPreviousActions, attemptDeleteFAQ, attemptDeleteNews, attemptGetFAQ, attemptGetNews, attemptPostFAQ, attemptEditedFAQ, attemptPostNews, attemptGetAllDonors, attemptGetAllInventory };

export default authSlice.reducer;

