
import { useMemo, useState } from "react";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import data from "../data/Product.json";
import ProductCard from "../components/card";

// Flatten all category products into one array
const products = data.categories.flatMap((category) =>
  category.products.map((product) => ({
    ...product,
    categoryName: category.name,
    categorySlug: category.slug,
  }))
);

// Dynamic categories from JSON
const categories = [
  "All",
  ...Array.from(
    new Set(data.categories.map((category) => category.name))
  ),
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Add Product to Cart
  const addToCart = (product) => {
    const existingCart = JSON.parse(
      localStorage.getItem("ecom-cart") || "[]"
    );

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "ecom-cart",
      JSON.stringify(updatedCart)
    );
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    let result = products.filter((product) => {
      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.categoryName,
        product.details?.brief,
        product.details?.detailed,
        ...(product.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);

      const matchesCategory =
        category === "All" ||
        product.categoryName === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "lowToHigh") {
      result = [...result].sort(
        (a, b) =>
          (a.price?.current || 0) - (b.price?.current || 0)
      );
    }

    if (sortBy === "highToLow") {
      result = [...result].sort(
        (a, b) =>
          (b.price?.current || 0) - (a.price?.current || 0)
      );
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) =>
          (b.rating?.average || 0) - (a.rating?.average || 0)
      );
    }

    if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) =>
          Number(b.isNewArrival) - Number(a.isNewArrival)
      );
    }

    return result;
  }, [searchQuery, category, sortBy]);

  // Search Submit
  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  // Clear Search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  // Reset All Filters
  const resetFilters = () => {
    setSearchQuery("");
    setCategory("All");
    setSortBy("default");
    setShowFilters(false);
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-[#F1E8DF] px-4 pb-12 pt-28 text-[#3B2521] sm:px-8 md:px-12 lg:px-20">
      <section className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#9B7869]">
            Discover Your Style
          </p>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#3B2521] sm:text-5xl">
            Search Products
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#806B60] sm:text-base">
            Find your favourite products and explore our latest
            collection.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-3xl items-center rounded-full border border-[#D2BFB0] bg-[#F8F2EC] p-2 shadow-sm"
        >
          <SearchIcon
            className="ml-4 shrink-0 text-[#9B7869]"
            size={21}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search for products..."
            className="w-full bg-transparent px-4 py-3 text-sm text-[#3B2521] outline-none placeholder:text-[#A58D80] sm:text-base"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="mr-2 rounded-full p-2 text-[#806052] transition hover:bg-[#E8DCD0]"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            className="rounded-full bg-[#C65B45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#AA4936] sm:px-8"
          >
            Search
          </button>
        </form>

        {/* Toolbar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#D9C8B9] pb-5">
          <div>
            <p className="text-sm text-[#806B60]">
              Search results for{" "}
              <span className="font-semibold text-[#3B2521]">
                {searchQuery || "all products"}
              </span>
            </p>

            <p className="mt-1 text-xs text-[#9B7869]">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full border border-[#D2BFB0] bg-[#F8F2EC] px-4 py-2 text-sm text-[#806052] transition hover:bg-[#E8DCD0] md:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-full border border-[#D2BFB0] bg-[#F8F2EC] px-4 py-2 text-sm text-[#806052] outline-none focus:border-[#C65B45]"
            >
              <option value="default">Sort By</option>
              <option value="lowToHigh">
                Price: Low to High
              </option>
              <option value="highToLow">
                Price: High to Low
              </option>
              <option value="rating">Top Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } h-fit rounded-2xl border border-[#D9C8B9] bg-[#F8F2EC] p-5 md:block`}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#3B2521]">
                Categories
              </h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-[#C65B45] hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="space-y-2">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setShowFilters(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    category === item
                      ? "bg-[#C65B45] font-semibold text-white"
                      : "text-[#806B60] hover:bg-[#E8DCD0] hover:text-[#3B2521]"
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
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3">
                {filteredProducts.map((product) => {
                  const categorySlug =
                    product.categorySlug ||
                    product.category?.toLowerCase() ||
                    "garments";

                  return (
                    <ProductCard
                      key={`${product.categoryName}-${product.id}`}
                      product={product}
                      categorySlug={categorySlug}
                      onAdd={addToCart}
                    />
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#D2BFB0] bg-[#F8F2EC] px-5 text-center">
                <div className="mb-5 rounded-full bg-[#E8DCD0] p-5">
                  <SearchIcon
                    size={28}
                    className="text-[#806052]"
                  />
                </div>

                <h2 className="font-serif text-xl font-semibold text-[#3B2521]">
                  No Products Found
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#806B60]">
                  We couldn't find any products matching your
                  search. Try another keyword or category.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-full bg-[#C65B45] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#AA4936]"
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