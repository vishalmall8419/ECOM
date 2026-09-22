import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import catalog from "../../data/Product.json";

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
  const [touchStart, setTouchStart] = useState(null);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F1E8DF] px-6 pb-20 pt-36 text-center text-[#624e3c]">
        <h1 className="text-3xl font-extrabold text-[#241f1b]">
          Product not found
        </h1>
        <Link
          to="/products"
          className="mt-5 inline-block font-semibold text-[#C6532F] underline"
        >
          Back to products
        </Link>
      </main>
    );
  }

  const images = product.images?.length ? product.images : ["/assists/gar.png"];
  const specifications = Object.entries(product.specifications || {});
  const handleTouchEnd = (event) => {
    if (touchStart === null) return;
    const distance = touchStart - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 40) {
      setActiveImage((current) =>
        Math.min(
          Math.max(current + (distance > 0 ? 1 : -1), 0),
          images.length - 1,
        ),
      );
    }
    setTouchStart(null);
  };

  return (
    <main className="min-h-screen bg-[#F1E8DF] px-4 pb-20 pt-28 text-[#624e3c] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#806c5d] transition hover:text-[#E56B42]"
        >
          <ArrowLeft size={16} /> Back to products
        </Link>

        <div className="grid items-start  lg:grid-cols-[minmax(0,0.7fr)_minmax(360px,0.85fr)]">
          <section className="lg:sticky lg:top-24" aria-label="Product gallery">
            <div
              className="relative overflow-hidden rounded-l-2xl border border-[#e4d8cc] bg-[#f7f2ed] shadow-[0_12px_32px_rgba(98,78,60,0.08)]"
              onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex aspect-square transition-transform duration-300"
                style={{ transform: `translateX(-${activeImage * 100}%)` }}
              >
                {images.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full min-w-full object-cover"
                  />
                ))}
              </div>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous product image"
                    onClick={() =>
                      setActiveImage((current) => Math.max(current - 1, 0))
                    }
                    className="absolute left-3 top-1/2 rounded-full bg-white/90 p-2 text-[#624e3c] shadow transition hover:bg-[#E56B42] hover:text-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next product image"
                    onClick={() =>
                      setActiveImage((current) =>
                        Math.min(current + 1, images.length - 1),
                      )
                    }
                    className="absolute right-3 top-1/2 rounded-full bg-white/90 p-2 text-[#624e3c] shadow transition hover:bg-[#E56B42] hover:text-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div
              className="mt-4 flex gap-3 overflow-x-auto pb-2"
              aria-label="Choose product image"
            >
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show product image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                  className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-[#f7f2ed] sm:h-24 sm:w-20 ${activeImage === index ? "border-[#E56B42]" : "border-transparent"}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-r-2xl border border-[#e4d8cc] bg-white p-5 shadow-[0_12px_32px_rgba(98,78,60,0.06)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E56B42]">
              {product.category} / {product.brand}
            </p>
            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold leading-tight text-[#241f1b] sm:text-4xl">
                {product.name}
              </h1>
              <button
                type="button"
                aria-label="Add product to wishlist"
                className="shrink-0 rounded-full border border-[#d8cabe] p-3 text-[#624e3c] transition hover:border-[#E56B42] hover:bg-[#E56B42] hover:text-white"
              >
                <Heart size={19} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#806c5d]">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f1e8df] px-3 py-1 font-bold">
                <Star size={15} fill="currentColor" /> {product.rating.average}
              </span>
              <span>{product.rating.count} verified ratings</span>
              <span className="text-[#d2c1b3]">|</span>
              <span className="font-semibold text-[#C6532F]">
                {product.inventory.availability}
              </span>
            </div>

            <p className="mt-6 text-base leading-7 text-[#806c5d]">
              {product.details.brief}
            </p>
            <div className="mt-6 flex items-end gap-3 border-b border-[#eadfd5] pb-6">
              <span className="text-3xl font-extrabold text-[#241f1b]">
                ₹{product.price.current.toLocaleString("en-IN")}
              </span>
              <span className="pb-1 text-lg text-[#a8988a] line-through">
                ₹{product.price.original.toLocaleString("en-IN")}
              </span>
              <span className="pb-1 text-sm font-bold text-[#C6532F]">
                {product.price.discountPercentage}% off
              </span>
            </div>

            {product.specifications.sizes && (
              <div className="mt-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#624e3c]">
                  Select size
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.specifications.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="rounded-lg border border-[#cdbdad] px-4 py-2 text-sm font-semibold transition hover:border-[#E56B42] hover:text-[#C6532F]"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center justify-between rounded-lg border border-[#cdbdad] px-3 py-2 sm:w-32">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                className="flex-1 rounded-lg bg-[#E56B42] px-6 py-3 font-bold text-white transition hover:bg-[#C6532F]"
              >
                Add to cart
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-[#eadfd5] pt-5 text-sm text-[#806c5d]">
              <ShieldCheck size={18} className="text-[#E56B42]" /> Secure
              checkout and easy returns
            </div>

            <div className="mt-8 border-t border-[#eadfd5] pt-6">
              <h2 className="text-xl font-bold text-[#241f1b]">
                Product details
              </h2>
              <p className="mt-3 leading-7 text-[#806c5d]">
                {product.details.detailed}
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {specifications.map(([key, value]) => (
                  <div key={key} className="border-b border-[#f0e7df] pb-3">
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#a8988a]">
                      {key.replace(/([A-Z])/g, " $1")}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-[#624e3c]">
                      {formatValue(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
