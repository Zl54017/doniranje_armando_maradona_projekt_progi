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

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoute roles={[ROLE.Admin]} />}>
        <Route path="/main" element={<Main />} />
        <Route path="/severina" element={<>seve rina</>} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export default appRouter;
