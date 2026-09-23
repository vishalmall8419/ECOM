import { useMemo, useState } from "react";

import {
  Heart,
  ShoppingCart,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProductCard from "../../components/card";

import {
  addToCart,
  useStoredItems,
  CART_KEY,
  WISHLIST_KEY,
} from "../../src/store";

const Wishlist = () => {
  const [wishlistItems] = useStoredItems(WISHLIST_KEY);
  const [cartItems] = useStoredItems(CART_KEY);

  const [searchQuery, setSearchQuery] = useState("");

  // Check whether product already exists in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Filter wishlist products
  const filteredWishlist = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return wishlistItems;
    }

    return wishlistItems.filter((product) =>
      product.name?.toLowerCase().includes(query)
    );
  }, [wishlistItems, searchQuery]);

  // Products which are not out of stock
  const availableItems = wishlistItems.filter(
    (product) => product.stock !== false
  );

  // Add single product to cart
  const handleAddToCart = (product) => {
    if (!product?.id) {
      return;
    }

    if (isInCart(product.id)) {
      return;
    }

    addToCart(product);
  };

  // Move all available wishlist products to cart
  const handleMoveAllToCart = () => {
    if (availableItems.length === 0) {
      return;
    }

    const cartProductIds = new Set(
      cartItems.map((item) => item.id)
    );

    availableItems.forEach((product) => {
      if (!cartProductIds.has(product.id)) {
        addToCart(product);
      }
    });
  };

  // Count wishlist products already in cart
  const productsInCart = wishlistItems.filter((product) =>
    isInCart(product.id)
  ).length;

  return (
    <main className="min-h-screen bg-[#F1E8DF] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            {/* Breadcrumb */}
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
              <Link
                to="/"
                className="transition hover:text-[#8B5E3C]"
              >
                Home
              </Link>

              <ArrowRight size={14} />

              <span>Wishlist</span>
            </div>

            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2D2926] text-white">
                <Heart size={23} fill="currentColor" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#2D2926] sm:text-3xl">
                  My Wishlist
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Save your favorite products for later.
                </p>
              </div>
            </div>
          </div>

          {/* Move All Button */}
          <button
            type="button"
            onClick={handleMoveAllToCart}
            disabled={availableItems.length === 0}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2D2926] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4A403A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={17} />

            Move Available to Cart
          </button>
        </div>

        {/* Search */}
        <div className="mb-7">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search wishlist products..."
            className="w-full rounded-xl border border-[#E7DCD2] bg-white px-4 py-3 text-sm text-[#2D2926] outline-none transition placeholder:text-gray-400 focus:border-[#8B5E3C] sm:max-w-md"
          />
        </div>

        {/* Summary */}
        <div className="mb-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {/* Saved Products */}
          <div className="rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">
              Saved Products
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#2D2926]">
              {wishlistItems.length}
            </h2>
          </div>

          {/* Available Products */}
          <div className="rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">
              Available
            </p>

            <h2 className="mt-2 text-2xl font-bold text-green-600">
              {availableItems.length}
            </h2>
          </div>

          {/* Products In Cart */}
          <div className="col-span-2 rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm sm:col-span-1">
            <p className="text-xs font-medium text-gray-500">
              In Cart
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#8B5E3C]">
              {productsInCart}
            </h2>
          </div>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-[#E7DCD2] bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F3EF]">
              <Heart
                size={36}
                className="text-[#8B5E3C]"
              />
            </div>

            <h2 className="text-xl font-bold text-[#2D2926]">
              Your Wishlist is Empty
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Save products you love and find them easily whenever you want.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2D2926] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4A403A]"
            >
              Explore Products

              <ArrowRight size={17} />
            </Link>
          </div>
        ) : filteredWishlist.length === 0 ? (
          /* No Search Results */
          <div className="rounded-3xl border border-[#E7DCD2] bg-white px-6 py-16 text-center shadow-sm">
            <ShoppingBag
              size={40}
              className="mx-auto text-[#8B5E3C]"
            />

            <h2 className="mt-4 text-xl font-bold text-[#2D2926]">
              No Products Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try searching with a different product name.
            </p>
          </div>
        ) : (
          /* Wishlist Products */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredWishlist.map((product) => (
              <div
                key={product.id}
                className="relative"
              >
                <ProductCard
                  product={product}
                  categorySlug={
                    product.categorySlug || product.category
                  }
                  onAdd={handleAddToCart}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {wishlistItems.length > 0 && (
          <div className="mt-10 rounded-3xl bg-[#2D2926] px-6 py-10 text-center text-white sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <ShoppingBag size={25} />
            </div>

            <h2 className="mt-4 text-xl font-bold sm:text-2xl">
              Find Something New
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/60">
              Explore more products and discover something you’ll love.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#2D2926] transition hover:bg-[#F1E8DF]"
            >
              Browse Products

              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;