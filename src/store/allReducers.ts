import { combineReducers } from "@reduxjs/toolkit";
import { titleReducer } from "./title";
import { sideDrawerReducer } from "./sideDrawer";
import { waitSiteReducer } from "./overlay";
import { themeReducer } from "./theme";
import { progressReducer } from "./progress";
const reducers = combineReducers({
  title: titleReducer,
  sideDrawer: sideDrawerReducer,
  waitSite: waitSiteReducer,
  theme: themeReducer,
  progress: progressReducer
});

export default reducers;
