import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import Reservation from "./components/Reservation/Reservation";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reservation" element={<Reservation />} />
      </Routes>
    </>
  );
}

export default App;
