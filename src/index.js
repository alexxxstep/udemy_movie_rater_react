import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import { CookiesProvider } from "react-cookie";

const routing = (
  <BrowserRouter>
    <CookiesProvider>
      <Route exact path="/" component={Login} />
      <Route exact path="/movies" component={App} />
    </CookiesProvider>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
