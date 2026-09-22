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

const Router = () => {
  const location = useLocation();

  // 404 page check
  const is404Page = ![
    "/",
    "/products",
    "/about",
    "/search",
    "/wishlist",
    "/cart",
  ].includes(location.pathname) &&
    !location.pathname.match(
      /^\/products\/(garments|cosmetics|grocery)\/[^/]+$/
    );

  return (
    <>
      {/* Navbar 404 page par hide */}
      {!is404Page && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Product />} />

        {/* <Route path="/products">
          <Route
            path="garments/:id"
            element={<ProductDetails />}
          />

          <Route
            path="cosmetics/:id"
            element={<ProductDetails />}
          />

          <Route
            path="grocery/:id"
            element={<ProductDetails />}
          />
        </Route> */}

        <Route path="/products/:categorySlug/:productSlug" element={<ProductDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/search" element={<Search />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<Page404 />} />
      </Routes>

      {/* Footer 404 page par hide */}
      {!is404Page && <Footer />}
    </>
  );
};

export default Router;