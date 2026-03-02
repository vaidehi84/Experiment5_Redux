import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppProvider } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

function App() {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <AppProvider>
      <div className={`theme-${theme}`} style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
