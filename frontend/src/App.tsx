import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="menu" element={<Menu />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
