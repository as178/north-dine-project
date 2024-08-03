import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import ReservationContainer from "./containers/ReservationContainer";
import "./theme/high-contrast-theme.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservation" element={<ReservationContainer />} />{" "}
          {/* Use ReservationContainer */}
        </Routes>
      </div>
    </>
  );
}

export default App;
