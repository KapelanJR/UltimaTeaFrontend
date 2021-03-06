import React from "react";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Logout from "./Logout";
import { Outlet } from "react-router-dom";
import Containers from "./Containers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserRecipes, getIngredients, getTeas, getMachine } from "../actions/mainWindowsActions";
import Statuses from "./Statuses";

//var classNames = require("classnames");

export default function MainAppStatic({redirect=false}) {
  const dispach = useDispatch();
  const fetched_recipes = useSelector((state) => state.main.fetched_recipes);
  const fetched_machine = useSelector((state) => state.main.fetched_machine);
  const fetched_ingredients = useSelector(
    (state) => state.main.fetched_ingredients
  );
  const fetched_teas = useSelector((state) => state.main.fetched_teas);
  const storeToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (storeToken !== ""){
    if (!fetched_recipes) dispach(getUserRecipes());
    if (!fetched_ingredients) dispach(getIngredients());
    if (!fetched_teas) dispach(getTeas());
    if (!fetched_machine) dispach(getMachine());
    }
  }, [fetched_recipes,fetched_ingredients,fetched_teas,storeToken, dispach]);

  return (
    <div id="app_container">
      <PrivateRoute redirect={redirect}>
        <div id="containers_row">
          <Statuses />
          <Containers />
        </div>
        <div id="main_row">
          <div id="navbar_container">
            <NavBar />
            <Logout />
          </div>
          <div id="navbar_line"></div>
          <div id="main_content">
            <Outlet />
          </div>
        </div>
      </PrivateRoute>
    </div>
  );
}
