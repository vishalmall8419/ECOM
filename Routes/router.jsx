import { Routes, Route } from "react-router-dom";

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

const Router = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Product />} />
        <Route path="/products/">
          <Route path="garments/:id" element={<ProductDetails />} />
          <Route path="cosmetics/:id" element={<ProductDetails />} />
          <Route path="grocery/:id" element={<ProductDetails />} />
        </Route>

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
