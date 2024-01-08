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
import RedCross from "./RedCross";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main />} />
      <Route element={<ProtectedRoute roles={[ROLE.Donor]} />}>
        <Route path='/donor/:id' element={<Donor />} />
      </Route>
      <Route element={<ProtectedRoute roles={[ROLE.BloodBank]} />}>
        <Route path="/bloodBank/:id" element={<BloodBank />} />
      </Route>
      <Route element={<ProtectedRoute roles={[ROLE.Employee]} />}>
        <Route path='/employee/:id' element={<Employee />} />
      </Route>
      <Route element={<ProtectedRoute roles={[ROLE.RedCross]} />}>
        <Route path='/redCross' element={<RedCross />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default appRouter;
