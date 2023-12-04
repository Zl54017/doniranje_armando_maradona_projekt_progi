import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Main from "./Main";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { ROLE } from "../types/enums/Role";
import Donor from "./Donor";
import BloodBank from "./BloodBank";
import { Logout } from "@mui/icons-material";
import Employee from "./Employee";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main />} />
      <Route element={<ProtectedRoute roles={[ROLE.Donor]} />}>
        <Route path="/donor" element={<Donor />} />
      </Route>
      <Route element={<ProtectedRoute roles={[ROLE.BloodBank]} />}>
        <Route path="/bloodbank" element={<BloodBank />} />
      </Route>
      <Route element={<ProtectedRoute roles={[ROLE.Employee]} />}>
        <Route path="/employee" element={<Employee />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </>
  )
);

export default appRouter;
