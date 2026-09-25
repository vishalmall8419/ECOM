
import { useMemo, useState } from "react";
import Product from "../../data/Product.json";
import AddProduct from "./Component/Addproduct";

import {
  Package,
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ArrowLeft,
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

/* ============================================
   STOCK STATUS HELPERS
============================================ */

const getStockStatus = (stock) => {
  if (stock === 0) {
    return "Out of Stock";
  }

  if (stock <= 10) {
    return "Low Stock";
  }

  return "Active";
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-500/15 text-green-700";

    case "Low Stock":
      return "bg-yellow-500/15 text-yellow-700";

    case "Out of Stock":
      return "bg-red-500/15 text-red-700";

    default:
      return "bg-[#244838] text-[#D8D0B8]";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Active":
      return <CheckCircle size={14} />;

    case "Low Stock":
      return <AlertTriangle size={14} />;

    case "Out of Stock":
      return <XCircle size={14} />;

    default:
      return null;
  }
};

/* ============================================
   INITIAL PRODUCTS
============================================ */

const initialProducts = Product.categories.flatMap((category) =>
  category.products.map((product) => ({
    ...product,

    category: category.name,

    categorySlug: category.slug,

    image:
      product.images?.[0] ||
      "/placeholder-product.png",

    sku:
      product.inventory?.sku ||
      "N/A",

    stock:
      product.inventory?.stock ??
      0,

    price:
      product.price?.current ??
      0,

    originalPrice:
      product.price?.original ??
      0,

    availability:
      product.inventory?.availability ||
      "Out of Stock",
  })),
);

/* ============================================
   ADMIN PRODUCTS COMPONENT
============================================ */

const AdminProducts = () => {
  const [products, setProducts] = useState(initialProducts);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All Categories");

  const [stockFilter, setStockFilter] =
    useState("All Stock");

  const [selectedProducts, setSelectedProducts] =
    useState([]);

  const [showFilters, setShowFilters] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [productToDelete, setProductToDelete] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const productsPerPage = 5;

  /* ============================================
     DYNAMIC CATEGORIES
  ============================================ */

  const categories = useMemo(() => {
    const categoryNames = Product.categories.map(
      (item) => item.name,
    );

    return [
      "All Categories",
      ...categoryNames,
    ];
  }, []);

  /* ============================================
     FILTERED PRODUCTS
  ============================================ */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue =
        search.toLowerCase().trim();

      const productName =
        String(product.name || "").toLowerCase();

      const productSku =
        String(product.sku || "").toLowerCase();

      const productCategory =
        String(product.category || "").toLowerCase();

      const matchesSearch =
        productName.includes(searchValue) ||
        productSku.includes(searchValue) ||
        productCategory.includes(searchValue);

      const matchesCategory =
        category === "All Categories" ||
        product.category === category;

      const matchesStock =
        stockFilter === "All Stock" ||
        (stockFilter === "In Stock" &&
          product.stock > 10) ||
        (stockFilter === "Low Stock" &&
          product.stock > 0 &&
          product.stock <= 10) ||
        (stockFilter === "Out of Stock" &&
          product.stock === 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });
  }, [
    products,
    search,
    category,
    stockFilter,
  ]);

  /* ============================================
     PAGINATION
  ============================================ */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        productsPerPage,
    ),
  );

  const safePage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedProducts =
    filteredProducts.slice(
      (safePage - 1) * productsPerPage,
      safePage * productsPerPage,
    );

  /* ============================================
     SUMMARY COUNTS
  ============================================ */

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.stock > 10,
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= 10,
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0,
  ).length;

  /* ============================================
     SEARCH AND FILTER HANDLERS
  ============================================ */

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleStockChange = (value) => {
    setStockFilter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setStockFilter("All Stock");
    setCurrentPage(1);
  };

  /* ============================================
     PRODUCT SELECTION
  ============================================ */

  const handleSelectProduct = (id) => {
    setSelectedProducts((previous) =>
      previous.includes(id)
        ? previous.filter(
            (productId) => productId !== id,
          )
        : [...previous, id],
    );
  };

  const allCurrentSelected =
    paginatedProducts.length > 0 &&
    paginatedProducts.every((product) =>
      selectedProducts.includes(product.id),
    );

  const handleSelectAll = () => {
    const currentIds = paginatedProducts.map(
      (product) => product.id,
    );

    if (allCurrentSelected) {
      setSelectedProducts((previous) =>
        previous.filter(
          (id) => !currentIds.includes(id),
        ),
      );
    } else {
      setSelectedProducts((previous) => [
        ...new Set([
          ...previous,
          ...currentIds,
        ]),
      ]);
    }
  };

  /* ============================================
     ADD PRODUCT
  ============================================ */

  const handleAddProduct = (newProduct) => {
    const categoryName =
      newProduct.category || "Uncategorized";

    const categorySlug = categoryName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const formattedProduct = {
      ...newProduct,

      category: categoryName,

      categorySlug,

      image:
        newProduct.images?.[0] ||
        "/placeholder-product.png",

      sku:
        newProduct.inventory?.sku ||
        "N/A",

      stock:
        newProduct.inventory?.stock ??
        0,

      price:
        newProduct.price?.current ??
        0,

      originalPrice:
        newProduct.price?.original ??
        0,

      availability:
        newProduct.inventory?.availability ||
        "Out of Stock",
    };

    setProducts((previousProducts) => [
      formattedProduct,
      ...previousProducts,
    ]);

    setCurrentPage(1);
    setIsAddModalOpen(false);
  };

  /* ============================================
     DELETE PRODUCT
  ============================================ */

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    if (!productToDelete) return;

    setProducts((previousProducts) =>
      previousProducts.filter(
        (product) =>
          product.id !== productToDelete.id,
      ),
    );

    setSelectedProducts((previous) =>
      previous.filter(
        (id) => id !== productToDelete.id,
      ),
    );

    closeDeleteModal();
  };

  const deleteSelectedProducts = () => {
    if (selectedProducts.length === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedProducts.length} selected product(s)?`,
    );

    if (!confirmed) return;

    setProducts((previousProducts) =>
      previousProducts.filter(
        (product) =>
          !selectedProducts.includes(product.id),
      ),
    );

    setSelectedProducts([]);
    setCurrentPage(1);
  };

  /* ============================================
     EDIT PRODUCT
  ============================================ */

  const handleEditProduct = (product) => {
    window.alert(
      `Edit functionality for "${product.name}" will be connected using product ID ${product.id}.`,
    );
  };

  /* ============================================
     RENDER
  ============================================ */

  return (
    <div className="min-h-screen bg-[#102A20] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#D8D0B8]/70">
              <Link
                to="/dashboard"
                className="transition hover:text-[#F3D45D]"
              >
                Admin Dashboard
              </Link>

              <span>/</span>

              <span className="text-[#D8D0B8]">
                Products
              </span>
            </div>

            <h1 className="flex items-center gap-3 text-2xl font-bold text-[#FFF4D6] sm:text-3xl">
              <Package
                className="text-[#F3D45D]"
                size={30}
              />

              Products
            </h1>

            <p className="mt-2 text-sm text-[#D8D0B8]/70">
              Manage your product inventory and
              product listings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-2.5 text-sm font-semibold text-[#D8D0B8] transition hover:border-[#6D5B3C]/50 hover:text-[#F3D45D]"
            >
              <ArrowLeft size={17} />
              Admin Dashboard
            </Link>

            <button
              type="button"
              onClick={() =>
                setIsAddModalOpen(true)
              }
              className="inline-flex items-center gap-2 rounded-xl bg-[#F3D45D] px-4 py-2.5 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45]"
            >
              <Plus size={17} />
              Add Product
            </button>
          </div>
        </div>

        {/* ========================================
            SUMMARY CARDS
        ======================================== */}

        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total Products */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">
                  Total Products
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#FFF4D6]">
                  {totalProducts}
                </h2>
              </div>

              <div className="rounded-xl bg-[#244838] p-3 text-[#F3D45D]">
                <Package size={22} />
              </div>
            </div>
          </div>

          {/* In Stock */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">
                  In Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#FFF4D6]">
                  {activeProducts}
                </h2>
              </div>

              <div className="rounded-xl bg-green-500/15 p-3 text-green-600">
                <CheckCircle size={22} />
              </div>
            </div>
          </div>

          {/* Low Stock */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">
                  Low Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#FFF4D6]">
                  {lowStockProducts}
                </h2>
              </div>

              <div className="rounded-xl bg-yellow-500/15 p-3 text-yellow-600">
                <AlertTriangle size={22} />
              </div>
            </div>
          </div>

          {/* Out of Stock */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">
                  Out of Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#FFF4D6]">
                  {outOfStockProducts}
                </h2>
              </div>

              <div className="rounded-xl bg-red-500/15 p-3 text-red-600">
                <XCircle size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            PRODUCTS CARD
        ======================================== */}

        <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] shadow-sm transition-shadow duration-200 hover:shadow-md">

          {/* Toolbar */}
          <div className="border-b border-[#244838] p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#D8D0B8]/50"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    handleSearch(event.target.value)
                  }
                  placeholder="Search products, SKU or category..."
                  className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#F3D45D] focus:bg-[#18372A] focus:ring-2 focus:ring-[#244838]"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(
                      (previous) => !previous,
                    )
                  }
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    showFilters
                      ? "border-[#6D5B3C]/50 bg-[#244838]/50 text-[#F3D45D]"
                      : "border-[#6D5B3C]/40 text-[#D8D0B8] hover:border-[#6D5B3C]/50 hover:text-[#F3D45D]"
                  }`}
                >
                  <Filter size={17} />
                  Filters
                </button>

                {selectedProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={deleteSelectedProducts}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-500/15 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={17} />
                    Delete ({selectedProducts.length})
                  </button>
                )}

                <span className="text-sm text-[#D8D0B8]/70">
                  {filteredProducts.length} Products
                </span>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-5 grid gap-4 rounded-xl border border-[#244838] bg-[#244838]/60 p-4 sm:grid-cols-2">

                {/* Category Filter */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(event) =>
                      handleCategoryChange(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-3 text-sm text-[#D8D0B8] outline-none focus:border-[#F3D45D]"
                  >
                    {categories.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                    Stock Status
                  </label>

                  <select
                    value={stockFilter}
                    onChange={(event) =>
                      handleStockChange(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-3 text-sm text-[#D8D0B8] outline-none focus:border-[#F3D45D]"
                  >
                    <option value="All Stock">
                      All Stock
                    </option>

                    <option value="In Stock">
                      In Stock
                    </option>

                    <option value="Low Stock">
                      Low Stock
                    </option>

                    <option value="Out of Stock">
                      Out of Stock
                    </option>
                  </select>
                </div>

                {/* Reset Filters */}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#F3D45D] hover:text-[#DDBB45]"
                >
                  <X size={16} />
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* ========================================
              PRODUCTS TABLE
          ======================================== */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">

              <thead className="bg-[#244838]/60 text-xs uppercase tracking-wide text-[#D8D0B8]/70">
                <tr>
                  <th className="w-12 px-5 py-4">
                    <input
                      type="checkbox"
                      checked={allCurrentSelected}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-[#6D5B3C]/60 text-[#F3D45D] focus:ring-[#F3D45D]"
                    />
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Product
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Category
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    SKU
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Price
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Stock
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#244838]">
                {paginatedProducts.map((product) => {
                  const status = getStockStatus(
                    product.stock,
                  );

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-[#244838]/60"
                    >
                      {/* Checkbox */}
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(
                            product.id,
                          )}
                          onChange={() =>
                            handleSelectProduct(
                              product.id,
                            )
                          }
                          className="h-4 w-4 rounded border-[#6D5B3C]/60 text-[#F3D45D] focus:ring-[#F3D45D]"
                        />
                      </td>

                      {/* Product */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.image ||
                              "/placeholder-product.png"
                            }
                            alt={product.name}
                            className="h-14 w-14 rounded-xl border border-[#244838] object-cover"
                            onError={(event) => {
                              event.currentTarget.src =
                                "/placeholder-product.png";
                            }}
                          />

                          <div className="min-w-0">
                            <h3 className="max-w-56 truncate text-sm font-semibold text-[#FFF4D6]">
                              {product.name}
                            </h3>

                            <p className="mt-1 text-xs text-[#D8D0B8]/50">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4 text-sm text-[#D8D0B8]">
                        {product.category}
                      </td>

                      {/* SKU */}
                      <td className="px-5 py-4 text-sm font-medium text-[#D8D0B8]/70">
                        {product.sku}
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4 text-sm font-bold text-[#FFF4D6]">
                        ₹
                        {Number(
                          product.price || 0,
                        ).toLocaleString("en-IN")}
                      </td>

                      {/* Stock */}
                      <td className="px-5 py-4 text-sm font-semibold text-[#D8D0B8]">
                        {product.stock}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                            status,
                          )}`}
                        >
                          {getStatusIcon(status)}
                          {status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">

                          {/* View */}
                          <Link
                            to={`/products/${product.categorySlug}/${product.slug}`}
                            className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-[#244838]/50 hover:text-[#F3D45D]"
                            title="View Product"
                          >
                            <Eye size={17} />
                          </Link>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() =>
                              handleEditProduct(product)
                            }
                            className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-blue-50 hover:text-blue-600"
                            title="Edit Product"
                          >
                            <Edit size={17} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() =>
                              openDeleteModal(product)
                            }
                            className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-red-500/10 hover:text-red-600"
                            title="Delete Product"
                          >
                            <Trash2 size={17} />
                          </button>

                          {/* More */}
                          <button
                            type="button"
                            onClick={() =>
                              window.alert(
                                `More options for ${product.name}`,
                              )
                            }
                            className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-[#244838] hover:text-[#D8D0B8]"
                            title="More Options"
                          >
                            <MoreVertical size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ========================================
              EMPTY STATE
          ======================================== */}

          {paginatedProducts.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#244838] text-[#D8D0B8]/50">
                <Package size={30} />
              </div>

              <h3 className="text-lg font-semibold text-[#FFF4D6]">
                No Products Found
              </h3>

              <p className="mt-2 text-sm text-[#D8D0B8]/70">
                Try changing your search or filter
                settings.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm font-semibold text-[#F3D45D] hover:text-[#DDBB45]"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ========================================
              PAGINATION
          ======================================== */}

          {filteredProducts.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-[#244838] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#D8D0B8]/70">
                Showing{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {(safePage - 1) *
                    productsPerPage +
                    1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {Math.min(
                    safePage * productsPerPage,
                    filteredProducts.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() =>
                    setCurrentPage(
                      (previous) => previous - 1,
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-[#6D5B3C]/40 px-3 py-2 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]/60 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => (
                    <button
                      key={index + 1}
                      type="button"
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                      className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                        safePage === index + 1
                          ? "bg-[#F3D45D] text-[#102A20]"
                          : "border border-[#6D5B3C]/40 text-[#D8D0B8] hover:bg-[#244838]/60"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setCurrentPage(
                      (previous) => previous + 1,
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-[#6D5B3C]/40 px-3 py-2 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]/60 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================
          ADD PRODUCT MODAL
      ============================================ */}

      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />

      {/* ============================================
          DELETE CONFIRMATION MODAL
      ============================================ */}

      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#18372A] p-6 shadow-2xl">

            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15 text-red-600">
                <Trash2 size={21} />
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-[#244838] hover:text-[#D8D0B8]"
                aria-label="Close delete modal"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-[#FFF4D6]">
              Delete Product?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#D8D0B8]/70">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#D8D0B8]">
                {productToDelete.name}
              </span>
              ? This action cannot be undone in this
              frontend demo.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-xl border border-[#6D5B3C]/40 px-4 py-2.5 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]/60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;