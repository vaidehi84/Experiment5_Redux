import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
