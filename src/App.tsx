import { Col, Container, Navbar, NavbarBrand, Row } from "react-bootstrap";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { sampleProducts } from "./data";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route index element={<HomePage />} />
        <Route path='products/:slug' element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export default App;
