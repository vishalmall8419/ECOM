
import { Timer } from "lucide-react";
import img from "../assists/gar.png";

const ProductCard = () => {
  return (
    <div className="w-full max-w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white">

      {/* Product Image */}
      <div className="relative flex h-64 items-center justify-center p-4">

        {/* Discount Badge */}
        <div className="absolute left-0 top-0 bg-blue-600 px-3 py-2 text-center text-xs font-bold text-white">
          5%
          <br />
          OFF
        </div>

        <img
          src={img}
          alt="Product"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">

        {/* Delivery Time */}
        <div className="mb-3 inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold">
          <Timer size={13} />
          8 MINS
        </div>

        {/* Product Name */}
        <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-gray-900">
          Coca-Cola Soft Drink
        </h2>

        {/* Quantity */}
        <p className="mt-2 text-base text-gray-500">
          750 ml
        </p>

        {/* Price and Button */}
        <div className="mt-4 flex items-end justify-between gap-2">

          {/* Price */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              ₹38
            </h3>

            <p className="text-sm text-gray-400 line-through">
              ₹40
            </p>
          </div>

          {/* Add Button */}
          <button
            className="rounded-lg border border-green-600 bg-green-50 px-5 py-2 text-base font-bold text-green-700 hover:bg-green-100"
          >
            ADD
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;