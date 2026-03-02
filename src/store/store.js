import { configureStore } from "@reduxjs/toolkit";
import skillsReducer from "./skillsSlice";
import themeReducer from "./themeSlice";
import reportsReducer from "./reportsSlice";

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    theme: themeReducer,
    reports: reportsReducer,
  },
});
