import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    { id: 1, name: "AI Chatbot", category: "AI/ML", status: "Completed", progress: 100, priority: "High", tech: ["Python", "TensorFlow"], date: "2024-01" },
    { id: 2, name: "Portfolio Website", category: "Frontend", status: "Completed", progress: 100, priority: "Medium", tech: ["React", "CSS3"], date: "2024-03" },
    { id: 3, name: "Task Manager App", category: "Full Stack", status: "In Progress", progress: 72, priority: "High", tech: ["React", "Node.js", "MySQL"], date: "2024-06" },
    { id: 4, name: "ML Image Classifier", category: "AI/ML", status: "Completed", progress: 100, priority: "High", tech: ["Python", "Keras", "NumPy"], date: "2024-08" },
    { id: 5, name: "E-Commerce Dashboard", category: "Full Stack", status: "In Progress", progress: 55, priority: "Medium", tech: ["React", "Redux", "Node.js"], date: "2024-10" },
    { id: 6, name: "DSA Tracker", category: "Frontend", status: "In Progress", progress: 40, priority: "Low", tech: ["React", "LocalStorage"], date: "2024-11" },
    { id: 7, name: "GATE Study Planner", category: "Frontend", status: "Planning", progress: 10, priority: "Medium", tech: ["React", "Redux"], date: "2025-01" },
    { id: 8, name: "NLP Sentiment Analyzer", category: "AI/ML", status: "Planning", progress: 5, priority: "High", tech: ["Python", "NLTK", "Flask"], date: "2025-02" },
  ],
  pinnedIds: [],
  activeFilter: "All",
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    pinProject(state, action) {
      if (!state.pinnedIds.includes(action.payload)) {
        state.pinnedIds.push(action.payload);
      }
    },
    unpinProject(state, action) {
      state.pinnedIds = state.pinnedIds.filter((id) => id !== action.payload);
    },
    setActiveFilter(state, action) {
      state.activeFilter = action.payload;
    },
    updateProgress(state, action) {
      const { id, progress } = action.payload;
      const proj = state.projects.find((p) => p.id === id);
      if (proj) {
        proj.progress = progress;
        if (progress === 100) proj.status = "Completed";
        else if (progress === 0) proj.status = "Planning";
        else proj.status = "In Progress";
      }
    },
  },
});

export const { pinProject, unpinProject, setActiveFilter, updateProgress } = reportsSlice.actions;
export default reportsSlice.reducer;
