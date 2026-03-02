import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  skills: [
    { id: 1, name: "React.js", category: "Frontend", level: 85, starred: false },
    { id: 2, name: "Python", category: "AI/ML", level: 80, starred: false },
    { id: 3, name: "Node.js", category: "Backend", level: 70, starred: false },
    { id: 4, name: "SQL", category: "Database", level: 75, starred: false },
    { id: 5, name: "Machine Learning", category: "AI/ML", level: 65, starred: false },
    { id: 6, name: "CSS / Tailwind", category: "Frontend", level: 80, starred: false },
    { id: 7, name: "Git & GitHub", category: "DevOps", level: 85, starred: false },
    { id: 8, name: "Data Structures", category: "CS Core", level: 70, starred: false },
  ],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addFavorite(state, action) {
      if (!state.favorites.find((f) => f.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((f) => f.id !== action.payload);
    },
    clearFavorites(state) {
      state.favorites = [];
    },
    toggleSkillStar(state, action) {
      const skill = state.skills.find((s) => s.id === action.payload);
      if (skill) skill.starred = !skill.starred;
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, toggleSkillStar } =
  skillsSlice.actions;
export default skillsSlice.reducer;
