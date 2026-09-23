import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Grid3X3,
  Package,
  ArrowRight,
  ShoppingBag,
  FolderOpen,
} from "lucide-react";

import Product from "../../data/Product.json";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // JSON se categories ko read karna
  const categories = useMemo(() => {
    return Product.categories.map((category) => ({
      ...category,
      productCount: category.products?.length || 0,
      image:
        category.products?.[0]?.images?.[0] ||
        "/placeholder-product.png",
    }));
  }, []);

  // Search ke according categories filter karna
  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [categories, searchTerm]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
            <Link
              to="/"
              className="transition hover:text-indigo-600"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-slate-700">
              Categories
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                <Grid3X3 size={16} />
                Explore Categories
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Shop by Category
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Explore our different categories and find
                products that match your needs.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Package size={18} />
              <span>
                {categories.length} Categories
              </span>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-8">
          <div className="relative max-w-xl">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search categories..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </section>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category) => (
              <article
                key={category.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Category Image */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    onError={(event) => {
                      event.currentTarget.src =
                        "/placeholder-product.png";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
                    {category.productCount} Products
                  </div>
                </div>

                {/* Category Details */}
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {category.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Browse {category.name.toLowerCase()} products
                      </p>
                    </div>

                    <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                      <FolderOpen size={19} />
                    </div>
                  </div>

                  <Link
                    to={`/products/${category.slug}`}
                    className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    <span>View Products</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : (
          /* Empty Search Result */
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <ShoppingBag size={28} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              No Categories Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different category name.
            </p>

            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Clear Search
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default Categories;