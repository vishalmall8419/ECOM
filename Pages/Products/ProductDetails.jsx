import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import catalog from "../../data/Product.json";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  useStoredItems,
  WISHLIST_KEY,
} from "../../src/store";

const formatValue = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value;
};

const ProductDetails = () => {
  const { categorySlug, productSlug } = useParams();

  const category = catalog.categories.find(
    (item) => item.slug === categorySlug,
  );

  const product = category?.products.find((item) => item.slug === productSlug);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [wishlistItems] = useStoredItems(WISHLIST_KEY);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-6 text-center">
        <div>
          <h1 className="text-3xl font-black text-[#242424]">
            Product not found
          </h1>

          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0798b5] px-6 py-3 font-bold text-white"
          >
            <ArrowLeft size={18} />
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images?.length ? product.images : ["/assists/gar.png"];

  const specifications = Object.entries(product.specifications || {});

  const variants =
    product.specifications?.sizes ||
    product.specifications?.colors ||
    product.variants ||
    [];

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const changeImage = (direction) => {
    setActiveImage((current) => {
      if (direction === "next") {
        return current === images.length - 1 ? 0 : current + 1;
      }

      return current === 0 ? images.length - 1 : current - 1;
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-3 pb-12 pt-24 text-[#242424] sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1850px]">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 px-1 text-sm text-[#929292]">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-semibold transition hover:text-[#0798b5]"
          >
            <ArrowLeft size={16} />
            Products
          </Link>

          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="max-w-[240px] truncate text-[#555]">
            {product.name}
          </span>
        </div>

        {/* EXACTLY THREE MAIN SECTIONS:
            1. Thumbnail column
            2. Single large image
            3. Independently scrollable product details
        */}
        <div className="grid items-start gap-1 rounded-[26px] border  border-[#e3e3e3] bg-white p-3 sm:p-5 lg:grid-cols-[70px_minmax(0,1fr)_minmax(430px,0.9fr)] lg:gap-1 lg:p-6">
          {/* SECTION 1: Small images */}
          <aside
            className="order-2 flex overflow-x-auto pb-1 justify-center items-center lg:order-1 lg:max-h-[calc(100vh-170px)] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0"
            aria-label="Product thumbnails"
          >
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                aria-label={`Show product image ${index + 1}`}
                onClick={() => setActiveImage(index)}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 bg-[#f7f7f7] transition ${
                  activeImage === index
                    ? "border-[#8b6d5a] shadow-[0_0_0_2px_rgba(139,109,90,0.12)]"
                    : "border-transparent hover:border-[#cfcfcf]"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </aside>

          {/* SECTION 2: Single large image */}
          <section className="order-1 min-w-0 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f5f5f5]">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#666] shadow-sm">
                {activeImage + 1} / {images.length}
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => changeImage("previous")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#333] shadow-md transition hover:bg-[#0798b5] hover:text-white"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => changeImage("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#333] shadow-md transition hover:bg-[#0798b5] hover:text-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Image-side benefits */}
            <div className="mt-4 grid grid-cols-3 rounded-2xl border border-[#ededed] bg-white px-2 py-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={19} className="text-[#b5b507]" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#777] sm:text-xs">
                  Secure
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 border-x border-[#ededed]">
                <Truck size={19} className="text-[#b5b507]" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#777] sm:text-xs">
                  Fast Delivery
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={19} className="text-[#b5b507]" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#777] sm:text-xs">
                  Easy Returns
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 3: Only this section scrolls on desktop */}
          <section className="order-3 min-h-0 overflow-hidden rounded-2xl border border-[#e4e4e4] bg-white lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:overflow-y-auto lg:overscroll-contain">
            <div className="p-5 sm:p-7 lg:p-8">
              {/* Product heading */}
              <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#bca75ba3]">
                    {product.category}
                  </p>

                  <h1 className="mt-1 text-3xl font-black leading-tight tracking-tight text-[#282818] sm:text-4xl">
                    {product.name}
                  </h1>

                  <p className="mt-1 text-base text-[#7373738c]">
                    By{" "}
                    <span className="font-bold">
                      {product.brand || "Premium Brand"}
                    </span>
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3 text-[#777]">
                  <button
                    type="button"
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    onClick={() =>
                      isWishlisted
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product)
                    }
                    className={`transition hover:scale-110 hover:text-[#0798b5] ${
                      isWishlisted ? "text-[#0798b5]" : ""
                    }`}
                  >
                    <Heart
                      size={29}
                      strokeWidth={1.8}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </button>

                  <button
                    type="button"
                    aria-label="Share product"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: product.name,
                          text: product.details?.brief || product.name,
                          url: window.location.href,
                        });
                      }
                    }}
                    className="transition hover:scale-110 hover:text-[#0798b5]"
                  >
                    <Share2 size={27} strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fff5d8] px-3 py-1.5 text-sm font-bold text-[#a56d14]">
                  <Star size={15} fill="currentColor" />
                  {product.rating.average}
                </span>

                <span className="text-sm text-[#777]">
                  {product.rating.count} verified ratings
                </span>

                <span className="text-sm font-bold text-[#58ad0ec3]">
                  {product.inventory.availability}
                </span>
              </div>

              {/* Pricing */}
              <div className="mt-2">
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <span className="text-2xl font-black tracking-tight text-[#794108]">
                    ₹{product.price.current.toLocaleString("en-IN")}
                  </span>

                  <span className="text-lg font-extrabold text-[#13a04c]">
                    ({product.price.discountPercentage}% OFF)
                  </span>
                </div>
                <p className="text-sm font-bold text-[#9e9c95a8] line-through">
                  MRP ₹{product.price.original.toLocaleString("en-IN")} 
                </p>
                <p className=" text-base text-[#0000008c]">Incl. of all taxes</p>
              </div>

              <div className="my-7 border-t border-[#e4e4e4]" />

              {/* Variant */}
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-black text-[#242424]">
                    Select Size
                  </h2>

                  <button
                    type="button"
                    className="whitespace-nowrap text-sm font-medium text-[#b59807] transition hover:underline sm:text-base"
                  >
                    Size Chart ›
                  </button>
                </div>

                {variants.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {variants.map((variant) => (
                      <button
                        key={variant}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`flex h-10 min-w-10 items-center justify-center rounded-full border-2 px-5 text-base font-bold transition ${
                          selectedVariant === variant
                            ? "border-[#3f3903] bg-[#f3d4b6] text-white"
                            : "border-[#e0e3e7] bg-white text-[#555] hover:border-[#0798b5] hover:text-[#0798b5]"
                        }`}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-[#999]">
                    No variants available for this product.
                  </p>
                )}
              </div>

              <div className="my-7 border-t border-[#e4e4e4]" />

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex h-14 items-center justify-between rounded-xl border border-[#e3e3e3] px-5 sm:w-36">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    className="text-[#aaa] transition hover:text-[#0798b5]"
                  >
                    <Minus size={20} />
                  </button>

                  <span className="font-bold text-[#333]">{quantity}</span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="text-[#aaa] transition hover:text-[#0798b5]"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={variants.length > 0 && !selectedVariant}
                  onClick={handleAddToCart}
                  className="h-14 flex-1 rounded-xl border-2 border-[#ff4e6b] px-6 font-black text-[#ff4e6b] transition hover:bg-[#fff1f4] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {variants.length > 0 && !selectedVariant
                    ? "Select Variant"
                    : "Add to Cart"}
                </button>
              </div>

              {/* Description */}
              <div className="mt-8 border-t border-[#e4e4e4] pt-7">
                <h2 className="text-3xl font-black text-[#242424]">
                  Product Details
                </h2>

                <h3 className="mt-7 text-xl font-black text-[#242424]">
                  Description
                </h3>

                <p className="mt-3 text-base leading-7 text-[#777]">
                  {product.details.detailed || product.details.brief}
                </p>

                {/* Specifications */}
                <dl className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {specifications.map(([key, value]) => (
                    <div key={key} className="rounded-xl bg-[#fafafa] p-4">
                      <dt className="text-xs font-bold uppercase tracking-wide text-[#999]">
                        {key.replace(/([A-Z])/g, " $1")}
                      </dt>

                      <dd className="mt-2 text-sm font-bold leading-6 text-[#444]">
                        {formatValue(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Additional information */}
              <div className="mt-8 space-y-4 border-t border-[#e4e4e4] pt-7">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 shrink-0 text-[#ffc68c]" size={21} />
                  <div>
                    <p className="font-bold text-[#333]">Reliable delivery</p>
                    <p className="mt-1 text-sm leading-6 text-[#777]">
                      Your product will be packed carefully and delivered to
                      your selected address.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck
                    className="mt-0.5 shrink-0 text-[#ffc68c]"
                    size={21}
                  />
                  <div>
                    <p className="font-bold text-[#333]">Secure shopping</p>
                    <p className="mt-1 text-sm leading-6 text-[#777]">
                      Enjoy a secure checkout experience and customer support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RotateCcw
                    className="mt-0.5 shrink-0 text-[#ffc68c]"
                    size={21}
                  />
                  <div>
                    <p className="font-bold text-[#333]">Easy returns</p>
                    <p className="mt-1 text-sm leading-6 text-[#777]">
                      Review the return policy before placing your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
