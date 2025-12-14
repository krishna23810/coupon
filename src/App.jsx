import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Dashboard from "./pages/deshboard";
import Signup from "./pages/signup";
import UserDetails from "./pages/userDetails";
import CreateProduct from "./pages/createProduct";
import ViewCartProducts from "./pages/ViewCartProducts";
import CreateCoupon from "./pages/createCoupon";
import ViewCouponCodes from "./pages/ViewCouponCodes";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="w-full h-full">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/deashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/cart-products" element={<ViewCartProducts />} />
            <Route path="/create-coupon" element={<CreateCoupon />} />
            <Route path="/coupons" element={<ViewCouponCodes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
