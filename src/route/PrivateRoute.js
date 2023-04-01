import React from "react";
import { Route, Redirect } from "react-router-dom";

const auth = localStorage.getItem("jwt");

console.log(auth, 303)

const PrivateRoute = ({ exact, component: Component, ...rest }) => (
  <Route
    exact={exact ? true : false}
    rest
    render={(props) =>
      auth ? (
        <Component {...props} {...rest}></Component>
      ) : (
        <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
        // <Redirect to={`${process.env.PUBLIC_URL}/auth-home`}></Redirect>


      )
    }
  ></Route>
);

export default PrivateRoute;
