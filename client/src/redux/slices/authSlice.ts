import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginInput from "../../types/inputs/user/LoginInput";
import authService from "../../services/api/routes/auth";
import localStorageUtility from "../../utils/localStorage/auth";
import AuthUser from "../../types/inputs/user/AuthUser";
import { ROLE } from "../../types/enums/Role";
import { create } from "domain";
import RegisterInput from "../../types/inputs/user/RegisterInput";

interface AuthState {
  user: LoginInput | undefined;
  role: ROLE | undefined;
}

const initialState: AuthState = {
  user: undefined,
  role: undefined,
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

const fetchData = createAsyncThunk("auth/fetchDataStatus", async (user: RegisterInput) => {
  const token = localStorageUtility.getAuthToken();
  if (token!==null){
    const response = await authService.getData(token);
    return response.data
  }
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
      fetchData.fulfilled, 
      (state, action: PayloadAction<AuthUser>) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
      }
    )
  },
});

export const { clearUser } = authSlice.actions;

export { attemptLogin, fetchUser, attemptLogout, attemptRegister, fetchData };

export default authSlice.reducer;
