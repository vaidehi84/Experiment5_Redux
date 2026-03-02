import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { memo } from "react";

const ThemeToggle = memo(function ThemeToggle() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(toggleTheme())} className="theme-toggle-btn">
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
});

export default ThemeToggle;
