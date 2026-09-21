import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Nav />

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

        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
    </>
  );
};

export default Router;
