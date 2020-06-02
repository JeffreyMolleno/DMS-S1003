import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import MainPage from "../Pages/MainPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/main_page" component={MainPage} />
    </BrowserRouter>
  );
}
