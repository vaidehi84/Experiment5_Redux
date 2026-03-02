import { createContext, useContext, useState, useMemo } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [userProfile] = useState({
    name: "Vaidehi Sharma",
    firstName: "Vaidehi",
    role: "AI & ML Engineer · Full Stack Developer",
    email: "vaidehi.sharma@example.com",
    university: "B.E. Computer Science (AI & ML)",
    cgpa: 8.7,
    avatar: "VS",
    linkedin: "https://www.linkedin.com/in/vaidehi-sharma-27b979288/",
    github: "https://github.com/vaidehisharma",
    available: true,
  });

  const [layoutDense, setLayoutDense] = useState(false);

  const toggleLayout = () => setLayoutDense((d) => !d);

  const value = useMemo(
    () => ({ userProfile, layoutDense, toggleLayout }),
    [userProfile, layoutDense]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be inside AppProvider");
  return ctx;
}
