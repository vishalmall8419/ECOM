
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  ShieldCheck,
  Tag,
} from "lucide-react";
import gsap from "gsap";

const Cart = () => {
  const pageRef = useRef(null);
  const itemsRef = useRef(null);
  const summaryRef = useRef(null);

  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Load cart items from LocalStorage
  useEffect(() => {
    const storedCart = JSON.parse(
      localStorage.getItem("ecom-cart") || "[]"
    );

    setCartItems(storedCart);
  }, []);

  // Save cart items to LocalStorage
  useEffect(() => {
    localStorage.setItem("ecom-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // GSAP Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".cart-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          itemsRef.current,
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          summaryRef.current,
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max((item.quantity || 1) - 1, 0),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove Product
  const removeItem = (id) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Price Calculations
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.price?.current || 0) * (item.quantity || 1),
    0
  );

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;

  const deliveryCharge =
    subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 40;

  const total = subtotal - discount + deliveryCharge;

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "ECOM10") {
      setCouponApplied(true);
    }
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-[#F1E8DF] px-4 py-10 text-[#3B2521] sm:px-6 lg:px-10 pt-25"
    >
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="cart-heading mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#9B7869]">
            Your Selection
          </p>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Your Cart
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#806B60] sm:text-base">
                Everything you love, collected in one place.
                Review your items before checkout.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#D2BFB0] bg-[#F8F2EC] px-4 py-2 text-sm font-medium text-[#806052]">
              <ShoppingBag size={17} />
              {totalItems} Items
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <section className="flex min-h-[480px] flex-col items-center justify-center rounded-3xl border border-[#D9C8B9] bg-[#F8F2EC] px-5 py-14 text-center shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#E8DCD0] text-[#806052]">
              <ShoppingBag size={42} strokeWidth={1.4} />
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#3B2521]">
              Your cart is empty
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#806B60]">
              Your favourite products are waiting for you.
              Explore our collection and find something special.
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
          /* Cart Content */
          <div className="grid items-start gap-7 lg:grid-cols-[1fr_380px]">
            {/* Cart Items */}
            <section
              ref={itemsRef}
              className="rounded-3xl border border-[#D9C8B9] bg-[#F8F2EC] p-4 shadow-sm sm:p-6"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[#DDCFC3] pb-5">
                <h2 className="font-serif text-2xl font-bold">
                  Shopping Bag
                </h2>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-semibold uppercase tracking-wider text-[#A15B4A] transition hover:text-[#C65B45]"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => {
                  const currentPrice = item.price?.current || 0;
                  const originalPrice = item.price?.original || 0;
                  const quantity = item.quantity || 1;

                  return (
                    <article
                      key={item.id}
                      className="flex gap-4 border-b border-[#DDCFC3] pb-6 last:border-0 last:pb-0 sm:gap-5"
                    >
                      {/* Image */}
                      <Link
                        to={`/products/${(
                          item.category || "garments"
                        ).toLowerCase()}/${item.id}`}
                        className="h-32 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#E8DCD0] sm:h-40 sm:w-32"
                      >
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9B7869]">
                                {item.category || "Collection"}
                              </p>

                              <Link
                                to={`/products/${(
                                  item.category || "garments"
                                ).toLowerCase()}/${item.id}`}
                              >
                                <h3 className="line-clamp-2 font-serif text-lg font-bold leading-6 text-[#3B2521] transition hover:text-[#C65B45] sm:text-xl">
                                  {item.name}
                                </h3>
                              </Link>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="shrink-0 rounded-full p-1.5 text-[#A58D80] transition hover:bg-[#E8DCD0] hover:text-[#C65B45]"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>

                          <p className="mt-1 text-xs text-[#9B7869]">
                            {item.brand || "ECOM Essentials"}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                          {/* Quantity */}
                          <div className="flex items-center rounded-full border border-[#D2BFB0] bg-[#F1E8DF]">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-[#806052] transition hover:bg-[#E8DCD0]"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>

                            <span className="min-w-7 text-center text-sm font-semibold">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-[#806052] transition hover:bg-[#E8DCD0]"
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-bold text-[#3B2521]">
                              ₹
                              {(currentPrice * quantity).toLocaleString(
                                "en-IN"
                              )}
                            </p>

                            {originalPrice > currentPrice && (
                              <p className="text-xs text-[#A58D80] line-through">
                                ₹
                                {(originalPrice * quantity).toLocaleString(
                                  "en-IN"
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Continue Shopping */}
              <div className="mt-7 border-t border-[#DDCFC3] pt-6">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[#806052] transition hover:text-[#C65B45]"
                >
                  <ArrowLeft
                    size={16}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                  Continue Shopping
                </Link>
              </div>
            </section>

            {/* Order Summary */}
            <aside
              ref={summaryRef}
              className="rounded-3xl border border-[#D9C8B9] bg-[#F8F2EC] p-5 shadow-sm sm:p-7 lg:sticky lg:top-6"
            >
              <h2 className="font-serif text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 border-b border-[#DDCFC3] pb-6 text-sm">
                <div className="flex items-center justify-between text-[#806B60]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3B2521]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#806B60]">
                  <span>Discount</span>
                  <span className="font-semibold text-[#A3A878]">
                    -₹{discount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#806B60]">
                  <span>Delivery</span>
                  <span className="font-semibold text-[#3B2521]">
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>
                </div>
              </div>

              {/* Coupon */}
              <div className="border-b border-[#DDCFC3] py-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#5A4036]">
                  <Tag size={16} />
                  Apply Coupon
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponApplied(false);
                    }}
                    placeholder="Enter coupon"
                    className="min-w-0 flex-1 rounded-xl border border-[#D2BFB0] bg-[#F1E8DF] px-3 py-2.5 text-sm uppercase text-[#3B2521] outline-none placeholder:text-[#A58D80] focus:border-[#C65B45]"
                  />

                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="rounded-xl bg-[#A3A878] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#858D60]"
                  >
                    Apply
                  </button>
                </div>

                <p className="mt-2 text-[11px] text-[#9B7869]">
                  Use ECOM10 to get 10% off.
                </p>

                {couponApplied && (
                  <p className="mt-2 text-xs font-semibold text-[#7D8558]">
                    Coupon applied successfully.
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex items-end justify-between gap-3 py-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9B7869]">
                    Total Amount
                  </p>

                  <p className="mt-1 font-serif text-3xl font-bold text-[#3B2521]">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                </div>

                <span className="text-xs text-[#9B7869]">
                  INR
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#C65B45] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#C65B45]/20 transition hover:bg-[#AA4936]"
              >
                Proceed to Checkout
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              {/* Benefits */}
              <div className="mt-6 space-y-4 border-t border-[#DDCFC3] pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8DCD0] text-[#806052]">
                    <Truck size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#5A4036]">
                      Free Delivery
                    </p>

                    <p className="text-[11px] text-[#9B7869]">
                      On orders above ₹499
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8DCD0] text-[#806052]">
                    <ShieldCheck size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#5A4036]">
                      Secure Checkout
                    </p>

                    <p className="text-[11px] text-[#9B7869]">
                      Safe and protected payment
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;