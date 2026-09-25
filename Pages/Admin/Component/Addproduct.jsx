import { useState } from "react";
import {
  X,
  PackagePlus,
  ImagePlus,
  Save,
  RotateCcw,
} from "lucide-react";

const initialFormData = {
  name: "",
  category: "",
  brand: "",
  sku: "",
  price: "",
  originalPrice: "",
  stock: "",
  image: "",
  description: "",
  availability: "In Stock",
};

const AddProduct = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid current price";
    }

    if (
      formData.originalPrice &&
      Number(formData.originalPrice) < Number(formData.price)
    ) {
      newErrors.originalPrice =
        "Original price should be greater than current price";
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "Enter a valid stock quantity";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const currentPrice = Number(formData.price);
    const originalPrice = formData.originalPrice
      ? Number(formData.originalPrice)
      : currentPrice;

    const discountPercentage =
      originalPrice > currentPrice
        ? Math.round(
            ((originalPrice - currentPrice) / originalPrice) * 100,
          )
        : 0;

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      slug: formData.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      category: formData.category,
      brand: formData.brand.trim(),
      images: formData.image
        ? [formData.image.trim()]
        : ["/placeholder-product.png"],

      details: {
        brief: formData.description.trim(),
        detailed: formData.description.trim(),
      },

      price: {
        currency: "INR",
        current: currentPrice,
        original: originalPrice,
        discountPercentage,
      },

      inventory: {
        sku: formData.sku.trim(),
        stock: Number(formData.stock),
        availability: formData.availability,
      },

      rating: {
        average: 0,
        count: 0,
      },

      tags: [],
      isFeatured: false,
      isNewArrival: true,
    };

    onAdd?.(newProduct);

    setFormData(initialFormData);
    setErrors({});
    onClose?.();
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A150F]/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#18372A] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#6D5B3C]/40 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#244838] text-[#F3D45D]">
              <PackagePlus size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#FFF4D6] sm:text-xl">
                Add New Product
              </h2>

              <p className="text-xs text-[#D8D0B8]/70 sm:text-sm">
                Add a new product to your inventory
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#D8D0B8]/70 transition hover:bg-[#244838] hover:text-[#FFF4D6]"
            aria-label="Close modal"
          >
            <X size={21} />
          </button>
        </div>

        {/* Modal Content */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-5 py-6 sm:px-7"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                Product Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-[#244838] ${
                  errors.name
                    ? "border-red-500/40"
                    : "border-[#6D5B3C]/40 focus:border-[#F3D45D]"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                Category *
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-[#18372A] px-4 py-3 text-sm outline-none transition focus:border-[#F3D45D] focus:ring-4 focus:ring-[#244838] ${
                  errors.category
                    ? "border-red-500/40"
                    : "border-[#6D5B3C]/40"
                }`}
              >
                <option value="">Select category</option>
                <option value="Garments">Garments</option>
                <option value="Grocery">Grocery</option>
                <option value="Footwear">Footwear</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
              </select>

              {errors.category && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label
                htmlFor="brand"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                Brand
              </label>

              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
                className="w-full rounded-xl border border-[#6D5B3C]/40 px-4 py-3 text-sm outline-none transition focus:border-[#F3D45D] focus:ring-4 focus:ring-[#244838]"
              />
            </div>

            {/* SKU */}
            <div>
              <label
                htmlFor="sku"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                SKU *
              </label>

              <input
                id="sku"
                name="sku"
                type="text"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. ECOM-GAR-001"
                className={`w-full rounded-xl border px-4 py-3 text-sm uppercase outline-none transition focus:ring-4 focus:ring-[#244838] ${
                  errors.sku
                    ? "border-red-500/40"
                    : "border-[#6D5B3C]/40 focus:border-[#F3D45D]"
                }`}
              />

              {errors.sku && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.sku}
                </p>
              )}
            </div>

            {/* Availability */}
            <div>
              <label
                htmlFor="availability"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                Availability
              </label>

              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-3 text-sm outline-none transition focus:border-[#F3D45D] focus:ring-4 focus:ring-[#244838]"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Pre Order">Pre Order</option>
              </select>
            </div>

            {/* Current Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                Current Price (₹) *
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="799"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-[#244838] ${
                  errors.price
                    ? "border-red-500/40"
                    : "border-[#6D5B3C]/40 focus:border-[#F3D45D]"
                }`}
              />

              {errors.price && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Original Price */}
            <div>
              <label
                htmlFor="originalPrice"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                Original Price (₹)
              </label>

              <input
                id="originalPrice"
                name="originalPrice"
                type="number"
                min="0"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="1199"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-[#244838] ${
                  errors.originalPrice
                    ? "border-red-500/40"
                    : "border-[#6D5B3C]/40 focus:border-[#F3D45D]"
                }`}
              />

              {errors.originalPrice && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.originalPrice}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                Stock Quantity *
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="100"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-[#244838] ${
                  errors.stock
                    ? "border-red-500/40"
                    : "border-[#6D5B3C]/40 focus:border-[#F3D45D]"
                }`}
              />

              {errors.stock && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.stock}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#D8D0B8]"
              >
                <ImagePlus size={16} />
                Product Image URL
              </label>

              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-[#6D5B3C]/40 px-4 py-3 text-sm outline-none transition focus:border-[#F3D45D] focus:ring-4 focus:ring-[#244838]"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-[#D8D0B8]"
              >
                Product Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short product description..."
                className="w-full resize-y rounded-xl border border-[#6D5B3C]/40 px-4 py-3 text-sm outline-none transition focus:border-[#F3D45D] focus:ring-4 focus:ring-[#244838]"
              />
            </div>
          </div>

          {/* Image Preview */}
          {formData.image.trim() && (
            <div className="mt-5 rounded-2xl border border-[#6D5B3C]/40 bg-[#244838]/60 p-4">
              <p className="mb-3 text-sm font-semibold text-[#D8D0B8]">
                Image Preview
              </p>

              <img
                src={formData.image}
                alt="Product preview"
                className="h-40 w-40 rounded-xl object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Modal Footer */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#6D5B3C]/40 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#6D5B3C]/40 px-5 py-3 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]"
            >
              <RotateCcw size={17} />
              Reset
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#6D5B3C]/40 px-5 py-3 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F3D45D] px-5 py-3 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45]"
            >
              <Save size={17} />
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;