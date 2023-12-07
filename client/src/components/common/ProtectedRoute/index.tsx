import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { ROLE } from "../../../types/enums/Role";
import { RootState, useAppDispatch } from "../../../redux/store";
import authLocalStorageUtility from "../../../utils/localStorage/auth";
import { fetchUser } from "../../../redux/slices/authSlice";
import React, { useEffect } from "react";

interface Props {
  roles: Array<ROLE>;
}

const ProtectedRoute = ({ roles }: Props) => {
  let location = useLocation();
  const { user, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user === undefined) {
      dispatch(fetchUser());
    }
  }, []);
  if (!authLocalStorageUtility.getAuthToken() || user == undefined) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (role !== undefined && !roles.includes(role)) {
    return <>ERROR - nemate dozvolu za pristup sadržaju</>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
