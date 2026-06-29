import React from "react";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "./AuthContext";
import logo from "../imports/logo_ph_c_th__b_n_tr_ng.png";

const C = { cyan: "#29ABE2", navy: "#1B3A6B", dark: "#07101E" };

interface HeaderProps {
  page: string;
  setPage: (page: string) => void;
  cartCount: number;
  onLoginClick: () => void;
}

export function Header({ page, setPage, cartCount, onLoginClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Trang chủ", id: "home" },
    { label: "Sản phẩm", id: "products" },
    { label: "Khuyến mãi", id: "home" },
    { label: "Phụ kiện", id: "home" },
    { label: "Tin công nghệ", id: "home" },
    { label: "Hỗ trợ", id: "home" },
  ];

  const handleNavClick = (pageId: string) => {
    if (pageId === "home" || pageId === "products") {
      setPage(pageId);
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    window.location.reload();
  };

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ background: C.dark, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => {
              setPage("home");
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src={logo} alt="Phúc Thọ Mobile" className="h-8 w-auto" />
            <span className="text-white font-extrabold hidden sm:inline text-sm">PHÚC THỌ MOBILE</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-medium transition-colors"
                style={{
                  color: page === item.id ? C.cyan : "#F0F6FF",
                  opacity: page === item.id ? 1 : 0.8,
                }}
                onMouseEnter={(e) => {
                  if (page !== item.id) {
                    e.currentTarget.style.color = C.cyan;
                  }
                }}
                onMouseLeave={(e) => {
                  if (page !== item.id) {
                    e.currentTarget.style.color = "#F0F6FF";
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search */}
            <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition">
              <Search size={20} style={{ color: "#F0F6FF" }} />
            </button>

            {/* Cart */}
            <button className="relative p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition">
              <ShoppingCart size={20} style={{ color: "#F0F6FF" }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition flex items-center gap-1"
                  style={{ color: C.cyan }}
                >
                  <User size={20} />
                  <ChevronDown size={14} />
                </button>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
                  style={{ color: "#F0F6FF" }}
                >
                  <User size={20} />
                </button>
              )}

              {/* User Dropdown Menu */}
              {user && userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-[16px] shadow-2xl py-2"
                  style={{ background: "white", zIndex: 50 }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: "#E8EFF8" }}>
                    <p className="font-bold text-sm" style={{ color: C.dark }}>
                      {user.name}
                    </p>
                    <p className="text-xs" style={{ color: "#94A3B8" }}>
                      {user.email}
                    </p>
                  </div>

                  <a
                    href="#"
                    className="block px-4 py-3 text-sm hover:bg-gray-50 transition"
                    style={{ color: C.dark }}
                  >
                    Thông tin cá nhân
                  </a>

                  <a
                    href="#"
                    className="block px-4 py-3 text-sm hover:bg-gray-50 transition"
                    style={{ color: C.dark }}
                  >
                    Đơn hàng của tôi
                  </a>

                  <a
                    href="#"
                    className="block px-4 py-3 text-sm hover:bg-gray-50 transition"
                    style={{ color: C.dark }}
                  >
                    Wishlist
                  </a>

                  <div style={{ borderColor: "#E8EFF8" }} className="border-t" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 transition flex items-center gap-2 text-red-500 font-semibold"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
            >
              {mobileMenuOpen ? (
                <X size={20} style={{ color: "#F0F6FF" }} />
              ) : (
                <Menu size={20} style={{ color: "#F0F6FF" }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-2 text-sm rounded-lg transition-colors"
                style={{
                  background: page === item.id ? C.cyan + "20" : "transparent",
                  color: page === item.id ? C.cyan : "#F0F6FF",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
