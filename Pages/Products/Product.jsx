import { useMemo, useState } from "react";
import { ArrowDownUp, Check, SlidersHorizontal } from "lucide-react";

import ProductCard from "../../components/card";
import catalog from "../../data/Product.json";
import { addToCart } from "../../src/store";

const Product = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("featured");

  const products = useMemo(() => {
    const allProducts = catalog.categories.flatMap((category) =>
      category.products.map((product) => ({
        ...product,
        categorySlug: category.slug,
      })),
    );

    const filteredProducts =
      activeCategory === "All"
        ? allProducts
        : allProducts.filter((product) => product.category === activeCategory);

    return [...filteredProducts].sort((first, second) => {
      if (sortOrder === "price-low")
        return first.price.current - second.price.current;
      if (sortOrder === "price-high")
        return second.price.current - first.price.current;
      if (sortOrder === "rating")
        return second.rating.average - first.rating.average;
      return Number(second.isFeatured) - Number(first.isFeatured);
    });
  }, [activeCategory, sortOrder]);

  return (
    <main className="min-h-screen bg-[#F1E8DF] px-4 pb-20 pt-28 text-[#624e3c] sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-[#d8cabe] pb-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#E56B42]">
              The ECOM edit
            </p>
            <h1 className="text-4xl font-extrabold uppercase tracking-normal text-[#241f1b] sm:text-5xl">
              Shop everyday well.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#806c5d]">
              Thoughtfully chosen essentials for getting dressed, stocked up and
              ready for the day.
            </p>
          </div>
          <p className="text-sm font-semibold text-[#806c5d]">
            {products.length} products
          </p>
        </div>

        <div className="flex flex-col gap-4 border-b border-[#d8cabe] py-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex flex-wrap items-center gap-2"
            aria-label="Filter by category"
          >
            <span className="mr-2 inline-flex items-center gap-2 text-sm font-bold">
              <SlidersHorizontal size={16} /> Filter
            </span>
            {[
              "All",
              ...catalog.categories.map((category) => category.name),
            ].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "border-[#624e3c] bg-[#624e3c] text-white" : "border-[#cdbdad] bg-transparent text-[#624e3c] hover:border-[#E56B42] hover:text-[#C6532F]"}`}
              >
                {category}
                {activeCategory === category && (
                  <Check className="ml-1 inline" size={14} />
                )}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold">
            <ArrowDownUp size={16} />
            <span className="sr-only">Sort products</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-lg border border-[#cdbdad] bg-[#f7f2ed] px-3 py-2 text-[#624e3c] outline-none focus:border-[#E56B42]"
            >
              <option value="featured">Featured first</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categorySlug={product.categorySlug}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Product;
