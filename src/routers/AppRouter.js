import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import AllBook from "../features/book/AllBook";
import Account from "../features/user/Account";
import SingUp from "../features/user/SingUp";
import SingIn from "../features/user/SingIn";

const TempView = () => {
  return <p>temporal</p>;
};

const ErrorNoFound = () => {
  return <p>404</p>;
};

export const AppRouter = () => {
  const auth = useSelector((state) => state.user.user);

  return (
    <div>
      <Switch>
        <PrivateRoute exac path="/notes" component={TempView} />
        <PrivateRoute exac path="/notes/create" component={TempView} />
        <PrivateRoute exac path="/notes/edit/:id" component={TempView} />

        <PrivateRoute exac path="/books" component={AllBook} />

        <PrivateRoute exac path="/account" component={Account} />

        <PublicRoute exac path="/login" component={SingIn} />
        <PublicRoute exac path="/signup" component={SingUp} />

        <Route exac path="/">
          {auth ? <Redirect to="/books" /> : <Redirect to="/login" />}
        </Route>

        <Route path="*">
          <ErrorNoFound />
        </Route>
      </Switch>
    </div>
  );
};
