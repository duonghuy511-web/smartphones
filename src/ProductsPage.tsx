import React, { useState, useMemo } from "react";
import { Search, ChevronDown, Star, Heart, ShoppingCart } from "lucide-react";

const C = { cyan: "#29ABE2", navy: "#1B3A6B", dark: "#07101E" };

const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  badge: string | null;
  colors: Array<{ name: string; hex: string }>;
  storages: Array<{ label: string; extra: number }>;
  specs: string[];
}

interface ProductsPageProps {
  products: Product[];
  setPage: (page: string) => void;
  setSelectedProductId: (id: number) => void;
}

export function ProductsPage({ products, setPage, setSelectedProductId }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "newest">("newest");
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Badge filter
    if (selectedBadge) {
      result = result.filter((p) => p.badge === selectedBadge);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, maxPrice, selectedBadge, sortBy]);

  const badges = ["New", "Hot", "Sale"];

  return (
    <div style={{ minHeight: "100vh", background: "#F5F9FF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b" style={{ borderColor: "#E8EFF8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-extrabold mb-4" style={{ color: C.dark }}>
            Tất cả sản phẩm
          </h1>

          {/* Search Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 flex items-center px-4 py-3 rounded-xl border" style={{ borderColor: "#E8EFF8" }}>
              <Search size={18} style={{ color: "#94A3B8" }} className="mr-2" />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent"
                style={{ color: C.dark }}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Sort */}
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
                style={{
                  background: sortBy !== "newest" ? C.cyan : "#E8EFF8",
                  color: sortBy !== "newest" ? "white" : C.navy,
                }}
              >
                Sắp xếp <ChevronDown size={14} />
              </button>
              <div
                className="absolute top-full left-0 mt-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all"
                style={{ background: "white", minWidth: "200px" }}
              >
                {(["newest", "price-low", "price-high"] as const).map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                    style={{ color: C.dark }}
                  >
                    {sort === "newest"
                      ? "Mới nhất"
                      : sort === "price-low"
                      ? "Giá thấp → cao"
                      : "Giá cao → thấp"}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold mb-1" style={{ color: C.navy }}>
                Giá tối đa: {fmt(maxPrice)}
              </label>
              <input
                type="range"
                min="0"
                max="20000000"
                step="1000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32"
              />
            </div>

            {/* Badge Filter */}
            {badges.map((badge) => (
              <button
                key={badge}
                onClick={() => setSelectedBadge(selectedBadge === badge ? null : badge)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
                style={{
                  background: selectedBadge === badge ? C.cyan : "#E8EFF8",
                  color: selectedBadge === badge ? "white" : C.navy,
                }}
              >
                {badge}
              </button>
            ))}

            {/* Clear filters */}
            {(searchQuery || maxPrice < 20000000 || selectedBadge) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setMaxPrice(20000000);
                  setSelectedBadge(null);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
                style={{ background: "#E8EFF8", color: C.navy }}
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-semibold mb-2" style={{ color: C.dark }}>
              Không tìm thấy sản phẩm
            </p>
            <p style={{ color: "#94A3B8" }}>Hãy thử thay đổi tiêu chí tìm kiếm của bạn</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-[20px] overflow-hidden transition-all hover:shadow-lg cursor-pointer"
                onClick={() => {
                  setSelectedProductId(product.id);
                  setPage("product");
                  window.scrollTo(0, 0);
                }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: badgeColor(product.badge) }}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-3 left-3 p-2 rounded-full bg-white hover:bg-gray-100 transition">
                    <Heart size={18} style={{ color: C.cyan }} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-2 line-clamp-2" style={{ color: C.dark }}>
                    {product.name}
                  </h3>

                  {/* Specs Preview */}
                  <div className="mb-3">
                    {product.specs.slice(0, 2).map((spec, i) => (
                      <p key={i} className="text-xs leading-tight mb-0.5" style={{ color: "#94A3B8" }}>
                        • {spec}
                      </p>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={C.cyan} style={{ color: C.cyan }} />
                    ))}
                    <span className="text-xs ml-1" style={{ color: "#94A3B8" }}>
                      (124)
                    </span>
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-end justify-between gap-2">
                    <div className="font-extrabold text-base" style={{ color: C.navy }}>
                      {fmt(product.price)}
                    </div>
                    <button
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ background: C.cyan }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <ShoppingCart size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results info */}
        <div className="mt-8 text-center text-sm" style={{ color: "#94A3B8" }}>
          Hiển thị {filteredProducts.length} / {products.length} sản phẩm
        </div>
      </div>
    </div>
  );
}

function badgeColor(badge: string): string {
  switch (badge) {
    case "New":
      return "#3B82F6";
    case "Hot":
      return "#EF4444";
    case "Sale":
      return "#10B981";
    default:
      return "#6B7280";
  }
}
