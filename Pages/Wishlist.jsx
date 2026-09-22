import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  HeartOff,
  ShoppingBag,
  Trash2,
  MoveRight,
} from "lucide-react";
import gsap from "gsap";
import {
  addToCart,
  removeFromWishlist as removeStoredWishlist,
  useStoredItems,
  WISHLIST_KEY,
} from "../src/store";

const Wishlist = () => {
  const pageRef = useRef(null);
  const headingRef = useRef(null);
  const productsRef = useRef(null);

  const [wishlistItems, updateWishlistItems] = useStoredItems(WISHLIST_KEY);

  // GSAP Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(headingRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          productsRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4",
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    removeStoredWishlist(id);
  };

  // Add wishlist item to cart
  const moveToCart = (product) => {
    addToCart(product);
    removeStoredWishlist(product.id);
  };

  // Clear wishlist
  const clearWishlist = () => {
    updateWishlistItems(() => []);
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-[#F1E8DF] px-4 py-10 text-[#3B2521] sm:px-6 lg:px-10 pt-25"
    >
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <section ref={headingRef} className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#9B7869]">
            Your Favourite Collection
          </p>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                My Wishlist
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#806B60] sm:text-base">
                Save the things you love and come back to them whenever you
                want.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#D2BFB0] bg-[#F8F2EC] px-4 py-2 text-sm font-medium text-[#806052]">
              <Heart size={17} />
              {wishlistItems.length} Items
            </div>
          </div>
        </section>

        {wishlistItems.length === 0 ? (
          /* Empty Wishlist */
          <section className="flex min-h-[480px] flex-col items-center justify-center rounded-3xl border border-[#D9C8B9] bg-[#F8F2EC] px-5 py-14 text-center shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#E8DCD0] text-[#806052]">
              <HeartOff size={42} strokeWidth={1.4} />
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#3B2521]">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#806B60]">
              You haven't saved any products yet. Explore our collection and add
              your favourite items here.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#C65B45] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#AA4936]"
            >
              Explore Products
              <ArrowRight size={17} />
            </Link>
          </section>
        ) : (
          /* Wishlist Content */
          <section ref={productsRef}>
            {/* Wishlist Toolbar */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm text-[#806B60]">
                {wishlistItems.length} saved{" "}
                {wishlistItems.length === 1 ? "item" : "items"}
              </p>

              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs font-semibold uppercase tracking-wider text-[#A15B4A] transition hover:text-[#C65B45]"
              >
                Clear All
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((product) => {
                const currentPrice = product.price?.current || 0;
                const originalPrice = product.price?.original || 0;
                const discount = product.price?.discountPercentage || 0;

                const categorySlug = (
                  product.category || "garments"
                ).toLowerCase();

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-[#D9C8B9] bg-[#F8F2EC] shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9B7869]/10"
                  >
                    {/* Product Image */}
                    <div className="relative h-72 overflow-hidden bg-[#E8DCD0]">
                      <Link
                        to={`/products/${categorySlug}/${product.slug}`}
                        className="block h-full w-full"
                      >
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </Link>

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <span className="absolute left-3 top-3 bg-[#C65B45] px-3 py-2 text-xs font-bold text-white">
                          {discount}% OFF
                        </span>
                      )}

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#D9C8B9] bg-[#F8F2EC]/95 text-[#806052] shadow-sm transition hover:bg-[#C65B45] hover:text-white"
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* New Arrival */}
                      {product.isNewArrival && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-[#A3A878] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          New Arrival
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9B7869]">
                        {product.category || "Collection"}
                      </p>

                      <Link to={`/products/${categorySlug}/${product.slug}`}>
                        <h2 className="line-clamp-2 min-h-12 font-serif text-lg font-bold leading-6 text-[#3B2521] transition hover:text-[#C65B45]">
                          {product.name}
                        </h2>
                      </Link>

                      <p className="mt-1 line-clamp-1 text-xs text-[#9B7869]">
                        {product.brand || "ECOM Essentials"}
                      </p>

                      {/* Price */}
                      <div className="mt-4 flex items-end gap-2">
                        <span className="text-lg font-bold text-[#3B2521]">
                          ₹{currentPrice.toLocaleString("en-IN")}
                        </span>

                        {originalPrice > currentPrice && (
                          <span className="text-xs text-[#A58D80] line-through">
                            ₹{originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* Move to Cart */}
                      <button
                        type="button"
                        onClick={() => moveToCart(product)}
                        className="group/button mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#C65B45] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#AA4936]"
                      >
                        <ShoppingBag size={16} />
                        Move to Cart
                        <MoveRight
                          size={16}
                          className="transition-transform group-hover/button:translate-x-1"
                        />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Continue Shopping */}
            <div className="mt-10 flex justify-center">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#806052] transition hover:text-[#C65B45]"
              >
                <ShoppingBag size={17} />
                Continue Shopping
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
