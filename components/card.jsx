import { Heart, Star, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import img from "../assists/gar.png";

const ProductCard = ({ product, categorySlug, onAdd }) => {
  const quantity =
    product.specifications?.quantity ||
    product.specifications?.weight ||
    product.specifications?.sizes?.[0] ||
    "Everyday essential";

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#e4d8cc] bg-white shadow-[0_8px_24px_rgba(98,78,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(98,78,60,0.12)]">
      {/* Product Image */}
      <div className="relative flex aspect-[5/6] items-center justify-center overflow-hidden bg-[#f7f2ed] p-4">
        {/* Discount Badge */}
        {product.price?.discountPercentage > 0 && (
          <div className="absolute left-0 top-0 z-10 bg-[#E56B42] px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-white">
            {product.price.discountPercentage}% off
          </div>
        )}

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/85 p-2 text-[#624e3c] opacity-0 shadow-sm transition group-hover:opacity-100 hover:bg-[#E56B42] hover:text-white"
        >
          <Heart size={17} />
        </button>

        <Link
          to={`/products/${categorySlug}/${product.slug}`}
          className="h-full w-full"
        >
          <img
            src={product.images?.[0] || img}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Delivery Time */}
        <div className="mb-3 inline-flex w-fit items-center gap-1 rounded-md bg-[#f1e8df] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#624e3c]">
          <Timer size={13} />
          Ready to ship
        </div>

        {/* Product Name */}
        <Link
          to={`/products/${categorySlug}/${product.slug}`}
          className="transition hover:text-[#E56B42]"
        >
          <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-[#241f1b]">
            {product.name}
          </h2>
        </Link>

        {/* Quantity */}
        <div className="mt-2 flex items-center gap-2 text-sm text-[#8b7868]">
          <span>{quantity}</span>
          <span className="text-[#d2c1b3]">|</span>
          <span className="inline-flex items-center gap-1">
            <Star size={13} fill="currentColor" /> {product.rating?.average}
          </span>
        </div>

        {/* Price and Button */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-5">
          {/* Price */}
          <div>
            <h3 className="text-lg font-bold text-[#241f1b]">
              ₹{product.price?.current?.toLocaleString("en-IN")}
            </h3>

            <p className="text-sm text-[#a8988a] line-through">
              ₹{product.price?.original?.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={() => onAdd?.(product)}
            className="rounded-lg border border-[#E56B42] bg-[#fff1ec] px-5 py-2 text-base font-bold text-[#C6532F] transition hover:bg-[#E56B42] hover:text-white"
          >
            ADD
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
