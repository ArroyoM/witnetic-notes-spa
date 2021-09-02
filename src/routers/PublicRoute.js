import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.user.user);

  localStorage.removeItem("errors");

  return (
    <Route {...rest}>{!auth ? <Component /> : <Redirect to="/books" />}</Route>
  );
}
