import { useMemo } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Truck,
  ShieldCheck,
  Tag,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import {
  CART_KEY,
  removeFromCart,
  useStoredItems,
} from "../../src/store";

const UserCart = () => {
  const navigate = useNavigate();

  const [cartItems, updateCart] = useStoredItems(CART_KEY);

  // Increase product quantity
  const handleIncreaseQuantity = (productId) => {
    updateCart((items) =>
      items.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: (Number(item.quantity) || 1) + 1,
            }
          : item
      )
    );
  };

  // Decrease product quantity
  const handleDecreaseQuantity = (productId) => {
    updateCart((items) =>
      items
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(
                  (Number(item.quantity) || 1) - 1,
                  0
                ),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product from cart
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  // Clear complete cart
  const handleClearCart = () => {
    updateCart(() => []);
  };

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(
        item.price?.current ?? item.price ?? 0
      );

      const quantity = Number(item.quantity) || 1;

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  // Delivery charge
  const deliveryCharge = subtotal === 0 || subtotal >= 999 ? 0 : 49;

  // Tax example
  const tax = subtotal * 0.05;

  // Final total
  const totalAmount = subtotal + deliveryCharge + tax;

  // Total products quantity
  const totalQuantity = cartItems.reduce((total, item) => {
    return total + (Number(item.quantity) || 1);
  }, 0);

  // Format currency
  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <main className="min-h-screen bg-[#F1E8DF] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
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

              <span>Cart</span>
            </div>

            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2D2926] text-white">
                <ShoppingCart size={23} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#2D2926] sm:text-3xl">
                  My Cart
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Review your products before checkout.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#D8C7BA] bg-white px-5 py-3 text-sm font-semibold text-[#2D2926] transition hover:bg-[#F8F3EF]"
          >
            <ArrowLeft size={17} />

            Continue Shopping
          </Link>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl border border-[#E7DCD2] bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F3EF]">
              <ShoppingBag
                size={38}
                className="text-[#8B5E3C]"
              />
            </div>

            <h2 className="text-xl font-bold text-[#2D2926] sm:text-2xl">
              Your Cart is Empty
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              You haven't added any products to your cart yet.
              Explore our products and start shopping.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2D2926] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4A403A]"
            >
              Explore Products

              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Summary Bar */}
            <div className="mb-6 flex flex-col justify-between gap-3 rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-[#2D2926]">
                  {totalQuantity}{" "}
                  {totalQuantity === 1 ? "Item" : "Items"} in your cart
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Review quantity and remove unwanted products.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClearCart}
                className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={16} />

                Clear Cart
              </button>
            </div>

            {/* Main Cart Layout */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px]">
              {/* Cart Products */}
              <section className="space-y-4">
                {cartItems.map((item) => {
                  const price = Number(
                    item.price?.current ?? item.price ?? 0
                  );

                  const originalPrice = Number(
                    item.price?.original ?? price
                  );

                  const quantity = Number(item.quantity) || 1;

                  const itemTotal = price * quantity;

                  return (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm sm:p-5"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F8F3EF] sm:h-32 sm:w-28">
                          <img
                            src={
                              item.images?.[0] ||
                              item.image ||
                              "/placeholder-product.png"
                            }
                            alt={item.name || "Product"}
                            className="h-full w-full object-contain p-2"
                            onError={(event) => {
                              event.currentTarget.src =
                                "/placeholder-product.png";
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#8B5E3C]">
                                {item.category || "Product"}
                              </p>

                              <h2 className="line-clamp-2 text-sm font-bold text-[#2D2926] sm:text-base">
                                {item.name || "Unnamed Product"}
                              </h2>
                            </div>

                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                              aria-label={`Remove ${
                                item.name || "product"
                              }`}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="text-base font-bold text-[#2D2926]">
                              {formatPrice(price)}
                            </span>

                            {originalPrice > price && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Quantity and Total */}
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center rounded-lg border border-[#E7DCD2]">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDecreaseQuantity(item.id)
                                }
                                className="p-2 text-[#2D2926] transition hover:bg-[#F8F3EF]"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={15} />
                              </button>

                              <span className="min-w-8 text-center text-sm font-semibold text-[#2D2926]">
                                {quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  handleIncreaseQuantity(item.id)
                                }
                                className="p-2 text-[#2D2926] transition hover:bg-[#F8F3EF]"
                                aria-label="Increase quantity"
                              >
                                <Plus size={15} />
                              </button>
                            </div>

                            {/* Item Total */}
                            <p className="text-sm font-bold text-[#8B5E3C]">
                              {formatPrice(itemTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Order Summary */}
              <aside className="lg:sticky lg:top-24">
                <div className="rounded-3xl border border-[#E7DCD2] bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-xl font-bold text-[#2D2926]">
                    Order Summary
                  </h2>

                  <div className="mt-6 space-y-4">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-gray-500">
                        Subtotal
                      </span>

                      <span className="font-semibold text-[#2D2926]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="flex items-center gap-2 text-gray-500">
                        <Truck size={15} />

                        Delivery
                      </span>

                      <span className="font-semibold text-[#2D2926]">
                        {deliveryCharge === 0
                          ? "FREE"
                          : formatPrice(deliveryCharge)}
                      </span>
                    </div>

                    {/* Tax */}
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-gray-500">
                        Estimated Tax
                      </span>

                      <span className="font-semibold text-[#2D2926]">
                        {formatPrice(tax)}
                      </span>
                    </div>
                  </div>

                  <div className="my-5 border-t border-dashed border-[#E7DCD2]" />

                  {/* Total */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-bold text-[#2D2926]">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#8B5E3C]">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>

                  {/* Free Delivery Message */}
                  {subtotal < 999 && subtotal > 0 && (
                    <div className="mt-5 rounded-xl bg-[#F8F3EF] p-3 text-xs leading-5 text-[#8B5E3C]">
                      Add{" "}
                      <strong>
                        {formatPrice(999 - subtotal)}
                      </strong>{" "}
                      more to get free delivery.
                    </div>
                  )}

                  {/* Checkout */}
                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D2926] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#4A403A]"
                  >
                    Proceed to Checkout

                    <ArrowRight size={17} />
                  </button>

                  {/* Benefits */}
                  <div className="mt-6 space-y-4 border-t border-[#E7DCD2] pt-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-[#8B5E3C]"
                      />

                      <div>
                        <p className="text-sm font-semibold text-[#2D2926]">
                          Secure Checkout
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Your shopping experience is protected.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Truck
                        size={20}
                        className="mt-0.5 shrink-0 text-[#8B5E3C]"
                      />

                      <div>
                        <p className="text-sm font-semibold text-[#2D2926]">
                          Reliable Delivery
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Delivery details will be shown at checkout.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Tag
                        size={20}
                        className="mt-0.5 shrink-0 text-[#8B5E3C]"
                      />

                      <div>
                        <p className="text-sm font-semibold text-[#2D2926]">
                          Great Value
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Enjoy convenient shopping from one place.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default UserCart;