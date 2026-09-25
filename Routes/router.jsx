import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Nav from "../components/Home component/Nav";
import Footer from "../components/Footer/Footer";

import Product from "../Pages/Products/Product";
import ProductDetails from "../Pages/Products/ProductDetails";
import About from "../Pages/About/About";
import Search from "../Pages/Search";
import Wishlist from "../Pages/Wishlist";
import Cart from "../Pages/Cart";
import Page404 from "../Pages/page404";
import Login from "../Pages/Authpages/Login";
import Register from "../Pages/Authpages/Register";
import Dashboardroutes from "./Dashboardroutes";

const Router = () => {
  const location = useLocation();

  // 404 page check
  const is404Page =
    ![
      "/",
      "/products",
      "/products/:categorySlug/:productSlug",
      "/about",
      "/search",
      "/wishlist",
      "/cart",
    ].includes(location.pathname) &&
    !location.pathname.match(
      /^\/products\/(garments|cosmetics|grocery)\/[^/]+$/,
    );

  const role = sessionStorage.getItem("Role");

  return (
    <>
      {/* Navbar 404 page par hide */}
      {!is404Page && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Product />} />

        <Route
          path="/products/:categorySlug/:productSlug"
          element={<ProductDetails />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/search" element={<Search />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

      

        <Route
          path="/login"
          element={
            role !== null ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
          <Route
          path="/dashboard/*"
          element={
            role !== null ? (
              <Dashboardroutes />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboardroutes />} />

        <Route path="*" element={<Page404 />} />
      </Routes>

      {/* Footer 404 page par hide */}
      {!is404Page && <Footer />}
    </>
  );
};

export default Router;
