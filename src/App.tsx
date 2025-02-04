import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import Login from "./Authentication/Login";
import SigninPage from "./pages/SigninPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderPage from "./pages/OrderPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/' element={<Dashboard />}>
        <Route index element={<HomePage />} />
        <Route path='products/:slug' element={<ProductPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='signin' element={<SigninPage />} />

        <Route path='' element={<ProtectedRoute />}>
          <Route path='shipping' element={<ShippingAddressPage />} />
          <Route path='order' element={<OrderPage />} />
          <Route path='placeOrderPage' element={<PlaceOrderPage />} />
          <Route path='payment' element={<PaymentMethodPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
