import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logOut } from "../features/user/userSlice";

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.user.user);
  const error = JSON.parse(localStorage.getItem("errors") || null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(logOut());
    }
  }, [error]);

  return (
    <Route {...rest}>{auth ? <Component /> : <Redirect to="/login" />}</Route>
  );
}
