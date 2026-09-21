
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, Star } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import data from "../data/Product.json";
import card from '../components/card'

// Flatten products from JSON
const products = data.categories.flatMap((category) =>
  category.products.map((product) => ({
    ...product,
    categoryName: category.name,
  }))
);

// Dynamic categories from JSON
const categories = [
  "All",
  ...data.categories.map((category) => category.name),
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Search and filter products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = searchQuery.toLowerCase().trim();

      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.details?.brief,
        ...(product.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchText);

      const matchesCategory =
        category === "All" || product.categoryName === category;

      return matchesSearch && matchesCategory;
    });

    // Sorting
    if (sortBy === "lowToHigh") {
      result = [...result].sort(
        (a, b) => a.price.current - b.price.current
      );
    }

    if (sortBy === "highToLow") {
      result = [...result].sort(
        (a, b) => b.price.current - a.price.current
      );
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => b.rating.average - a.rating.average
      );
    }

    return result;
  }, [searchQuery, category, sortBy]);

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setCategory("All");
    setSortBy("default");
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-[#faf7f3] px-4 pb-12 pt-30 sm:px-8 md:px-12 lg:px-20">
      <section className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[4px] text-gray-500">
            Discover Your Style
          </p>

          <h1 className="font-['Playfair_Display'] text-4xl font-semibold text-gray-900 sm:text-5xl">
            Search Products
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Find your favorite products and explore our latest collection.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-3xl items-center rounded-full border border-gray-200 bg-white p-2 shadow-sm"
        >
          <Search
            className="ml-4 shrink-0 text-gray-400"
            size={21}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands, categories..."
            className="w-full bg-transparent px-4 py-3 text-sm text-gray-800 outline-none sm:text-base"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="mr-2 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            className="rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 sm:px-8"
          >
            Search
          </button>
        </form>

        {/* Toolbar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <p className="text-sm text-gray-500">
              Search results for{" "}
              <span className="font-semibold text-gray-900">
                {searchQuery || "all products"}
              </span>
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 md:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none"
            >
              <option value="default">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } h-fit rounded-2xl border border-gray-200 bg-white p-5 md:block`}
          >
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Categories
            </h2>

            <div className="space-y-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    category === item
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <section>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="group"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#eee7df]">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {product.isNewArrival && (
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-800">
                          New
                        </span>
                      )}

                      {product.price?.discountPercentage > 0 && (
                        <span className="absolute right-3 top-3 rounded-full bg-[#624e3c] px-2 py-1 text-[10px] font-semibold text-white">
                          -{product.price.discountPercentage}%
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        {product.categoryName}
                      </p>

                      <h3 className="mt-1 line-clamp-2 text-sm font-medium text-gray-900 sm:text-base">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      {product.rating && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                          <Star
                            size={13}
                            fill="currentColor"
                            className="text-amber-500"
                          />

                          <span>{product.rating.average}</span>

                          <span>
                            ({product.rating.count})
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          ₹
                          {product.price.current.toLocaleString("en-IN")}
                        </span>

                        {product.price.original && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹
                            {product.price.original.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 text-center">
                <div className="mb-5 rounded-full bg-gray-100 p-5">
                  <Search size={28} className="text-gray-400" />
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  No Products Found
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  We couldn't find any products matching your search.
                  Try another keyword or category.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  View All Products
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default SearchPage;