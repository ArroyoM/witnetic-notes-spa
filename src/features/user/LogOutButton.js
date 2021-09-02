import React from "react";
import { useDispatch } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";

import { logOut } from "./userSlice";

const LogOutButton = () => {
  const dispatch = useDispatch();

  let logOutUser = () => {
    dispatch(logOut());
  };

  return <MenuItem onClick={logOutUser}>Cerrar sesión</MenuItem>;
};

export default LogOutButton;
