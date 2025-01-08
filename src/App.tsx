import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route index element={<HomePage />} />
        <Route path='products/:slug' element={<ProductPage />} />
        <Route path='cart' element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
