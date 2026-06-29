import { useState, useEffect, useRef } from "react";
import {
  Search, ShoppingCart, User, Menu, X, ChevronRight, ChevronLeft,
  Phone, Headphones, Watch, Tablet, Package, Sparkles,
  Shield, Truck, Wrench, CreditCard,
  Facebook, Youtube, Instagram,
  MapPin, Mail, PhoneCall,
  ArrowRight, BadgeCheck, Zap, Clock, MessageCircle,
  Star, Plus, Minus, Check, ChevronDown, Heart,
  Banknote, Wallet, Building2, RotateCcw, CheckCircle2, Package2,
} from "lucide-react";
import logo from "../imports/logo_ph_c_th__b_n_tr_ng.png";
import { AuthProvider, useAuth } from "./AuthContext";
import { LoginModal } from "./LoginModal";
import { ProductsPage } from "./ProductsPage";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const C = { cyan: "#29ABE2", navy: "#1B3A6B", dark: "#07101E", darker: "#040C16", mid: "#0D1F38" };

const IMG = {
  hero:      "https://images.unsplash.com/photo-1759588071785-06f3d46e745b?w=900&h=1100&fit=crop&auto=format",
  p1:        "https://images.unsplash.com/photo-1773414422164-eefdc240da58?w=700&h=850&fit=crop&auto=format",
  p2:        "https://images.unsplash.com/photo-1511140973288-19bf21d7e771?w=700&h=850&fit=crop&auto=format",
  p3:        "https://images.unsplash.com/photo-1564572234453-6b14f6e6fcfb?w=700&h=850&fit=crop&auto=format",
  p4:        "https://images.unsplash.com/photo-1772831902679-3f41c106d7a2?w=700&h=850&fit=crop&auto=format",
  acc:       "https://images.unsplash.com/photo-1550029402-8280f657d8d1?w=900&h=600&fit=crop&auto=format",
  campaign:  "https://images.unsplash.com/photo-1529346720291-0c190cc4c804?w=900&h=500&fit=crop&auto=format",
  store:     "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=600&fit=crop&auto=format",
  news1:     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&h=400&fit=crop&auto=format",
  news2:     "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop&auto=format",
  news3:     "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&h=400&fit=crop&auto=format",
  pd1:       "https://images.unsplash.com/photo-1694198336071-c599932f1f56?w=800&h=900&fit=crop&auto=format",
  pd2:       "https://images.unsplash.com/photo-1692813000094-bc335657382c?w=800&h=900&fit=crop&auto=format",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 0, name: "ProMax Ultra 15", image: IMG.p1,
    specs: ["Màn hình 6.7\" AMOLED 120Hz", "Camera 200MP AI", "Pin 5000mAh"],
    price: 18990000, badge: "New",
    colors: [{ name: "Đen huyền bí", hex: "#1C1C2E" }, { name: "Titan bạc", hex: "#A0A8B8" }, { name: "Xanh đại dương", hex: "#29ABE2" }, { name: "Tím mộng mơ", hex: "#7C5CBF" }],
    storages: [{ label: "128GB", extra: 0 }, { label: "256GB", extra: 500000 }, { label: "512GB", extra: 1500000 }],
    fullSpecs: { "Màn hình": "6.7\" Super AMOLED, 120Hz, FHD+", "Chip": "Snapdragon 8 Gen 3", "RAM": "12GB LPDDR5X", "Camera sau": "200MP + 12MP + 10MP", "Camera trước": "32MP", "Pin": "5000mAh, sạc 100W", "HĐH": "Android 15", "Chứng chỉ": "IP68" },
    gallery: [IMG.p1, IMG.pd1, IMG.pd2, IMG.p2],
  },
  {
    id: 1, name: "NovaThin X12", image: IMG.p2,
    specs: ["Màn hình 6.4\" Dynamic AMOLED", "Chip Snapdragon 8 Gen 3", "Sạc 100W siêu nhanh"],
    price: 13490000, badge: "Hot",
    colors: [{ name: "Đen carbon", hex: "#222222" }, { name: "Trắng ngà", hex: "#F0EDE6" }, { name: "Vàng ánh kim", hex: "#C9A84C" }],
    storages: [{ label: "128GB", extra: 0 }, { label: "256GB", extra: 500000 }],
    fullSpecs: { "Màn hình": "6.4\" Dynamic AMOLED, 120Hz", "Chip": "Snapdragon 8 Gen 3", "RAM": "8GB LPDDR5", "Camera sau": "108MP + 12MP + 10MP", "Camera trước": "12MP", "Pin": "4500mAh, sạc 100W", "HĐH": "Android 14", "Chứng chỉ": "IP67" },
    gallery: [IMG.p2, IMG.pd2, IMG.pd1, IMG.p1],
  },
  {
    id: 2, name: "ClearView Pro", image: IMG.p4,
    specs: ["Màn hình 6.1\" sắc nét", "Camera 108MP Zeiss Optics", "Kính Corning Gorilla 7"],
    price: 9990000, badge: "Sale",
    colors: [{ name: "Bạc phong cách", hex: "#C0C0C0" }, { name: "Xanh mint", hex: "#4ECDC4" }, { name: "Hồng pastel", hex: "#F4B8C1" }],
    storages: [{ label: "128GB", extra: 0 }, { label: "256GB", extra: 400000 }],
    fullSpecs: { "Màn hình": "6.1\" OLED, 90Hz", "Chip": "Dimensity 9200", "RAM": "8GB", "Camera sau": "108MP + 8MP + 5MP", "Camera trước": "16MP", "Pin": "4000mAh, sạc 67W", "HĐH": "Android 14", "Chứng chỉ": "IP65" },
    gallery: [IMG.p4, IMG.pd1, IMG.p1, IMG.pd2],
  },
  {
    id: 3, name: "FusionLite S3", image: IMG.p3,
    specs: ["Màn hình 6.5\" IPS LCD", "RAM 8GB – Bộ nhớ 256GB", "Pin 4500mAh hai ngày"],
    price: 6490000, badge: null,
    colors: [{ name: "Đen mờ", hex: "#333333" }, { name: "Xanh navy", hex: "#1B3A6B" }],
    storages: [{ label: "64GB", extra: 0 }, { label: "128GB", extra: 300000 }, { label: "256GB", extra: 700000 }],
    fullSpecs: { "Màn hình": "6.5\" IPS LCD, 90Hz", "Chip": "Helio G99", "RAM": "8GB", "Camera sau": "64MP + 8MP + 2MP", "Camera trước": "16MP", "Pin": "4500mAh, sạc 33W", "HĐH": "Android 14", "Chứng chỉ": "IPX4" },
    gallery: [IMG.p3, IMG.p2, IMG.pd2, IMG.pd1],
  },
];

const CATEGORIES = [
  { icon: Phone, label: "Điện thoại" }, { icon: Headphones, label: "Âm thanh" },
  { icon: Watch, label: "Đồng hồ" }, { icon: Tablet, label: "Tablet" },
  { icon: Package, label: "Phụ kiện" }, { icon: Sparkles, label: "Hàng mới" },
];

const SERIES = [
  { label: "Dòng cao cấp", title: "Hiệu năng đỉnh cao", desc: "Trải nghiệm công nghệ không giới hạn với dòng flagship độc quyền tại Phúc Thọ Mobile.", image: IMG.p1 },
  { label: "Dòng phổ thông", title: "Thông minh, vừa túi tiền", desc: "Lựa chọn hoàn hảo – hiệu năng tốt, thiết kế đẹp, giá cả hợp lý cho mọi gia đình.", image: IMG.p3 },
  { label: "Dòng phụ kiện", title: "Hoàn thiện trải nghiệm", desc: "Tai nghe, ốp lưng, sạc dự phòng và hàng trăm phụ kiện chính hãng đang chờ bạn.", image: IMG.acc },
  { label: "Bán chạy nhất", title: "Được yêu thích nhất", desc: "Top sản phẩm được khách hàng tin dùng nhiều nhất – đánh giá cao, giá tốt nhất.", image: IMG.p2 },
];

const FEATURES = [
  { icon: BadgeCheck, title: "Bảo hành chính hãng", desc: "Cam kết bảo hành đầy đủ từ nhà sản xuất, hỗ trợ đổi máy trong 30 ngày." },
  { icon: Zap, title: "Tư vấn tận tâm", desc: "Đội ngũ chuyên gia sẵn sàng tư vấn 24/7, giúp bạn chọn đúng sản phẩm." },
  { icon: Shield, title: "Sản phẩm chính hãng", desc: "100% hàng chính hãng, kiểm tra kỹ lưỡng trước khi đến tay khách hàng." },
  { icon: Truck, title: "Giao hàng siêu tốc", desc: "Giao trong ngày tại TP.HCM, 1-2 ngày toàn quốc, miễn phí từ 2 triệu." },
];

const TRUST = [
  { icon: Truck, title: "Giao hàng nhanh", desc: "Trong ngày tại TP.HCM" },
  { icon: Shield, title: "Bảo hành rõ ràng", desc: "12–24 tháng chính hãng" },
  { icon: Wrench, title: "Hỗ trợ kỹ thuật", desc: "Tư vấn & sửa chữa tận tâm" },
  { icon: CreditCard, title: "Thanh toán linh hoạt", desc: "Trả góp 0%, nhiều hình thức" },
];

const NEWS = [
  { image: IMG.news1, tag: "Mẹo hay", title: "Cách chọn điện thoại phù hợp với nhu cầu của bạn", desc: "Không phải smartphone đắt tiền nhất là lựa chọn tốt nhất. Hãy tìm hiểu các tiêu chí..." },
  { image: IMG.news2, tag: "Bảo quản", title: "5 thói quen giúp pin điện thoại bền lâu hơn", desc: "Những sai lầm nhỏ trong thói quen sạc pin có thể làm giảm tuổi thọ pin tới 40%." },
  { image: IMG.news3, tag: "Xu hướng", title: "Công nghệ AI trên smartphone – xu hướng 2025", desc: "AI đang thay đổi cách chúng ta chụp ảnh, soạn văn bản và tương tác với thiết bị." },
];

const PROMOTIONS = [
  { title: "Flash Sale cuối tuần", desc: "Giảm đến 30% cho hàng nghìn sản phẩm điện thoại và phụ kiện.", time: "Hết hạn: 31/07/2025", accent: C.cyan },
  { title: "Trả góp 0% lãi suất", desc: "Mua ngay, trả sau 12 tháng không lãi suất với thẻ tín dụng tham gia.", time: "Thường xuyên", accent: C.navy },
  { title: "Tặng phụ kiện cao cấp", desc: "Mua điện thoại từ 10 triệu, nhận ngay tai nghe TWS và ốp lưng cao cấp.", time: "Hết hạn: 15/08/2025", accent: "#2D6A4F" },
];

const PAYMENT_METHODS = [
  { id: "cod", icon: Banknote, label: "Thanh toán khi nhận hàng", desc: "Nhận hàng rồi thanh toán, miễn phí" },
  { id: "bank", icon: Building2, label: "Chuyển khoản ngân hàng", desc: "Vietcombank, Techcombank, MB Bank..." },
  { id: "installment", icon: CreditCard, label: "Trả góp 0% lãi suất", desc: "3-12 tháng, hỗ trợ mọi thẻ tín dụng" },
  { id: "ewallet", icon: Wallet, label: "Ví điện tử", desc: "MoMo, ZaloPay, VNPay, ShopeePay" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

function badgeStyle(b: string | null) {
  if (b === "New") return { background: C.cyan, color: "#fff" };
  if (b === "Hot") return { background: "#F97316", color: "#fff" };
  if (b === "Sale") return { background: "#EF4444", color: "#fff" };
  return {};
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function Logo() {
  return (
    <img
      src={logo}
      alt="Phúc Thọ Mobile"
      className="h-9 w-auto object-contain"
      style={{ height: 36, width: "auto", objectFit: "contain" as const }}
    />
  );
}

function BtnPrimary({ children, onClick, className = "", style = {} }: { children: React.ReactNode; onClick?: () => void; className?: string; style?: React.CSSProperties }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 text-white font-bold rounded-full transition-all ${className}`}
      style={{ background: C.cyan, ...style }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1e9acc"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(41,171,226,0.4)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.cyan; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
    >
      {children}
    </button>
  );
}

function BtnOutline({ children, onClick, className = "", dark = true }: { children: React.ReactNode; onClick?: () => void; className?: string; dark?: boolean }) {
  const borderColor = dark ? "rgba(255,255,255,0.22)" : "rgba(27,58,107,0.25)";
  const textColor = dark ? "#F0F6FF" : C.navy;
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all ${className}`}
      style={{ border: `1.5px solid ${borderColor}`, color: textColor }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = dark ? "rgba(41,171,226,0.55)" : C.navy; (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(27,58,107,0.06)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = borderColor; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      {children}
    </button>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────
function Header({ page, setPage, cartCount }: { page: string; setPage: (p: string) => void; cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = ["Trang chủ", "Sản phẩm", "Khuyến mãi", "Phụ kiện", "Tin công nghệ", "Hỗ trợ"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(7,16,30,0.98)" : "#0D1F38",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(41,171,226,0.15)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "0 2px 20px rgba(0,0,0,0.25)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#" onClick={e => { e.preventDefault(); setPage("home"); window.scrollTo(0,0); }}>
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item, i) => (
            <a key={i} href="#"
              onClick={e => { e.preventDefault(); if (item === "Trang chủ") {
              setPage("home");
              } else if (item === "Sản phẩm") {
              console.log("Products clicked");
              setPage("products");
              } window.scrollTo(0,0); }}
              className="px-4 py-2 text-sm font-semibold rounded-full transition-colors"
              style={{ color: i === 0 ? C.cyan : "rgba(240,246,255,0.68)" }}>
              {item}
            </a>
          ))}
          
        </nav>

        <div className="flex items-center gap-1">
          {[Search].map((Icon, i) => (
            <button key={i} className="hidden md:flex p-2 rounded-full transition-colors" style={{ color: "rgba(240,246,255,0.55)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F0F6FF")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,246,255,0.55)")}>
              <Icon size={18} />
            </button>
          ))}
          {[User].map((Icon, i) => (
          isLoggedIn ? (
          <button
          key={i}
           onClick={() => {
              // Show user menu
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition relative group"
          >
            <Icon size={18} className="text-cyan-400" />

            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
              <div className="p-3 border-b">
                <p className="font-bold text-sm" style={{ color: C.dark }}>
                  {user.name}
                </p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>
                  {user.email}
                </p>
              </div>

              <button
                onClick={() => {
                  logout();
                  window.location.reload();
              }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          </button>
        ) : (
          <button
            key={i}
            onClick={() => {
              setPage("login");
              console.log("Login clicked");
              window.scrollTo(0, 0);
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition relative group"
          >
            <Icon size={18} />
          </button>
        )
        ))}
          <button className="flex p-2 rounded-full relative" style={{ color: "rgba(240,246,255,0.55)" }}>
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ background: C.cyan }}>
                {cartCount}
              </span>
            )}
          </button>
          <BtnPrimary className="hidden md:inline-flex text-sm px-5 py-2 ml-1.5">Mua ngay</BtnPrimary>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 ml-1" style={{ color: "rgba(240,246,255,0.8)" }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ background: "rgba(13,31,56,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item, i) => (
              <a key={i} href="#" onClick={() => setMobileOpen(false)} className="py-3 px-4 text-sm font-semibold rounded-xl" style={{ color: "rgba(240,246,255,0.7)" }}>
                {item}
              </a>
            ))}
            <BtnPrimary className="mt-3 py-3.5 px-4 text-sm w-full">Mua ngay <ArrowRight size={16} /></BtnPrimary>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { heading: "Sản phẩm", links: ["Điện thoại", "Tablet", "Đồng hồ thông minh", "Âm thanh", "Phụ kiện"] },
    { heading: "Hỗ trợ khách hàng", links: ["Tư vấn mua hàng", "Theo dõi đơn hàng", "Bảo hành & sửa chữa", "Đổi trả hàng", "FAQ"] },
    { heading: "Chính sách", links: ["Chính sách bảo hành", "Chính sách đổi trả", "Chính sách bảo mật", "Điều khoản sử dụng"] },
  ];
  return (
    <footer className="py-16" style={{ background: C.darker, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4"><Logo /></div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(240,246,255,0.38)" }}>
              Điểm đến công nghệ tin cậy – sản phẩm chính hãng, dịch vụ tận tâm, giá tốt nhất.
            </p>
            <div className="flex gap-3">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(240,246,255,0.45)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.cyan; (e.currentTarget as HTMLElement).style.borderColor = "rgba(41,171,226,0.45)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,246,255,0.45)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="font-semibold mb-4 text-sm" style={{ color: "#F0F6FF" }}>{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-sm transition-colors" style={{ color: "rgba(240,246,255,0.4)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.cyan)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,246,255,0.4)")}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: "#F0F6FF" }}>Liên hệ</h4>
            <ul className="space-y-3">
              {[[MapPin, "123 Nguyễn Trãi, P.2, Q.5, TP.HCM"], [PhoneCall, "1800 1234 (Miễn phí)"], [Mail, "support@phuctho.vn"]].map(([Icon, text]: any, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(240,246,255,0.4)" }}>
                  <Icon size={13} className="mt-0.5 flex-shrink-0" style={{ color: C.cyan }} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(240,246,255,0.22)" }}>© 2025 Phúc Thọ Mobile. Tất cả quyền được bảo lưu.</p>
          <p className="text-xs" style={{ color: "rgba(240,246,255,0.22)" }}>Được thiết kế với ❤ tại Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedProductId }: { setPage: (p: string) => void; setSelectedProductId: (id: number) => void }) {
  const [activeTab, setActiveTab] = useState(0);

  function goProduct(id: number) {
    setSelectedProductId(id);
    setPage("product");
    window.scrollTo(0, 0);
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #07101E 0%, #0D1F38 55%, rgba(27,58,107,0.35) 100%)" }} />
          <div className="absolute top-0 right-0 w-3/5 h-full" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(41,171,226,0.11) 0%, transparent 65%)" }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(41,171,226,1) 1px, transparent 1px), linear-gradient(90deg, rgba(41,171,226,1) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-20 pb-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[calc(100vh-80px)]">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-7 w-fit" style={{ background: "rgba(41,171,226,0.12)", border: "1px solid rgba(41,171,226,0.28)", color: C.cyan }}>
                <Sparkles size={14} /> Ra mắt sản phẩm mới 2025
              </div>
              <h1 className="font-extrabold leading-[1.05] mb-6" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", letterSpacing: "-0.025em" }}>
                Công nghệ{" "}
                <span style={{ background: "linear-gradient(135deg, #29ABE2, #72D5F4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>tinh tế</span>
                <br />cho cuộc sống{" "}
                <span style={{ background: "linear-gradient(135deg, #29ABE2, #72D5F4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>hiện đại</span>
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "rgba(240,246,255,0.52)" }}>
                Khám phá bộ sưu tập điện thoại và phụ kiện cao cấp chính hãng tại Phúc Thọ Mobile — nơi công nghệ gặp gỡ phong cách.
              </p>
              <div className="flex flex-wrap gap-3">
                <BtnPrimary className="px-7 py-4 text-sm" onClick={() => { setSelectedProductId(0); setPage("product"); window.scrollTo(0,0); }}>
                  Khám phá ngay <ArrowRight size={17} />
                </BtnPrimary>
                <BtnOutline className="px-7 py-4 text-sm" onClick={() => { setSelectedProductId(0); setPage("product"); window.scrollTo(0,0); }}>Mua ngay</BtnOutline>
              </div>
              <div className="flex gap-10 mt-12 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {[["10K+", "Sản phẩm"], ["50K+", "Khách hàng"], ["4.9★", "Đánh giá"]].map(([n, l]) => (
                  <div key={l}><div className="text-2xl font-extrabold" style={{ color: C.cyan }}>{n}</div><div className="text-xs mt-0.5" style={{ color: "rgba(240,246,255,0.4)" }}>{l}</div></div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center order-1 lg:order-2 relative">
              <div className="relative">
                <div className="absolute inset-0 scale-75 blur-3xl rounded-full" style={{ background: "radial-gradient(ellipse, rgba(41,171,226,0.28) 0%, transparent 70%)" }} />
                <img
                  src={IMG.hero}
                  alt="Flagship smartphone"
                  className="relative z-10 object-contain"
                  style={{ width: "clamp(240px,32vw,400px)", height: "auto", mixBlendMode: "screen", animation: "float 4s ease-in-out infinite" }}
                />
                {[{ label: "Camera", val: "200MP AI", top: "12%", side: { left: "-52px" } }, { label: "Pin", val: "5000mAh", bottom: "20%", side: { right: "-52px" } }].map((badge: any, i) => (
                  <div key={i} className="absolute hidden lg:block rounded-2xl px-5 py-3" style={{ top: badge.top, bottom: badge.bottom, ...badge.side, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.13)" }}>
                    <div className="text-[11px] mb-0.5" style={{ color: "rgba(240,246,255,0.48)" }}>{badge.label}</div>
                    <div className="font-bold text-sm" style={{ color: C.cyan }}>{badge.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}} ::-webkit-scrollbar{display:none} *{scrollbar-width:none}`}</style>
      </section>

      {/* CATEGORIES */}
      <section className="py-14" style={{ background: "#fff" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map(({ icon: Icon, label }) => (
              <a key={label} href="#" className="flex flex-col items-center gap-3 p-5 rounded-3xl transition-all cursor-pointer" style={{ background: "#EEF6FC" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#D8EEF8"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(41,171,226,0.13)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#EEF6FC"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.navy})` }}>
                  <Icon size={21} className="text-white" />
                </div>
                <span className="font-semibold text-sm text-center leading-tight" style={{ color: C.dark }}>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20" style={{ background: "#F5F9FF" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.cyan }}>Sản phẩm nổi bật</p>
              <h2 className="font-extrabold" style={{ fontSize: "2rem", color: C.dark, letterSpacing: "-0.02em" }}>Được yêu thích nhất</h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold" style={{ color: C.navy }}
              onMouseEnter={e => (e.currentTarget.style.color = C.cyan)} onMouseLeave={e => (e.currentTarget.style.color = C.navy)}>
              Xem tất cả <ChevronRight size={15} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="bg-white rounded-[28px] overflow-hidden transition-all duration-300 cursor-pointer" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(41,171,226,0.13)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 14px rgba(0,0,0,0.06)"; }}>
                <div className="relative p-5 pb-0" style={{ background: "#EEF6FC" }}>
                  {p.badge && <span className="absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full" style={badgeStyle(p.badge)}>{p.badge}</span>}
                  <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)" }}
                    onClick={() => {}}>
                    <Heart size={15} style={{ color: "#94A3B8" }} />
                  </button>
                  <img src={p.image} alt={p.name} className="w-full h-52 object-cover rounded-2xl" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-2.5" style={{ color: C.dark }}>{p.name}</h3>
                  <ul className="space-y-1.5 mb-3">
                    {p.specs.map((s, j) => (
                      <li key={j} className="text-xs flex items-center gap-1.5" style={{ color: "#4A5568" }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.cyan }} />{s}
                      </li>
                    ))}
                  </ul>
                  <div className="font-extrabold text-base mb-4" style={{ color: C.navy }}>{fmt(p.price)}</div>
                  <div className="flex gap-2">
                    <BtnOutline dark={false} className="flex-1 text-xs py-2.5" onClick={() => goProduct(p.id)}>Chi tiết</BtnOutline>
                    <BtnPrimary className="flex-1 text-xs py-2.5" onClick={() => goProduct(p.id)}>Mua ngay</BtnPrimary>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SERIES */}
      <section className="py-20" style={{ background: C.dark }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.cyan }}>Dòng sản phẩm</p>
            <h2 className="font-extrabold text-white" style={{ fontSize: "2rem", letterSpacing: "-0.02em" }}>Khám phá theo dòng</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {SERIES.map((s, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={activeTab === i ? { background: C.cyan, color: "#fff" } : { border: "1px solid rgba(255,255,255,0.18)", color: "rgba(240,246,255,0.58)" }}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="rounded-[32px] overflow-hidden" style={{ background: "linear-gradient(135deg, #07101E 0%, #0D2044 60%, #1B3A6B 100%)" }}>
            <div className="grid md:grid-cols-2 min-h-[360px]">
              <div className="flex flex-col justify-center p-10 lg:p-14">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.cyan }}>{SERIES[activeTab].label}</p>
                <h3 className="font-extrabold text-white mb-4 leading-tight" style={{ fontSize: "1.9rem", letterSpacing: "-0.02em" }}>{SERIES[activeTab].title}</h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(240,246,255,0.52)" }}>{SERIES[activeTab].desc}</p>
                <BtnOutline className="text-sm px-7 py-3 w-fit">Tìm hiểu thêm <ArrowRight size={15} /></BtnOutline>
              </div>
              <div className="relative overflow-hidden flex items-end justify-center">
                <div className="absolute inset-0 opacity-22" style={{ background: `radial-gradient(ellipse at 60% 40%, ${C.cyan}, transparent)` }} />
                <img src={SERIES[activeTab].image} alt={SERIES[activeTab].label} className="relative z-10 w-full object-cover object-top" style={{ height: "clamp(240px,28vw,360px)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPAIGN BANNER */}
      <section className="py-14" style={{ background: "#0A1726" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="rounded-[32px] overflow-hidden relative" style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2044 55%, #07101E 100%)" }}>
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 72% 50%, #29ABE2, transparent 65%)" }} />
            <div className="relative grid md:grid-cols-2 items-center min-h-[280px]">
              <div className="p-10 lg:p-14">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider" style={{ background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.32)", color: "#FDA87A" }}>
                  🔥 Ưu đãi tháng 7/2025
                </div>
                <h2 className="font-extrabold text-white leading-tight mb-3" style={{ fontSize: "1.9rem", letterSpacing: "-0.02em" }}>
                  Nâng cấp thiết bị –<br /><span style={{ color: C.cyan }}>Nhận ưu đãi đặc biệt</span>
                </h2>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(240,246,255,0.52)" }}>Giảm đến 5 triệu, tặng phụ kiện cao cấp, trả góp 0% cho đơn từ 5 triệu.</p>
                <BtnPrimary className="px-7 py-3.5 text-sm" onClick={() => goProduct(0)}>Nhận ưu đãi ngay <ArrowRight size={17} /></BtnPrimary>
              </div>
              <div className="hidden md:flex items-center justify-center p-8">
                <img src={IMG.campaign} alt="Khuyến mãi" className="w-full max-w-sm object-cover rounded-2xl" style={{ height: "200px", opacity: 0.82 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.cyan }}>Tại sao chọn chúng tôi</p>
            <h2 className="font-extrabold" style={{ fontSize: "2rem", color: C.dark, letterSpacing: "-0.02em" }}>Cam kết của Phúc Thọ Mobile</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="p-7 rounded-[28px] transition-all" style={{ background: "#EEF6FC" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#D8EEF8"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 32px rgba(41,171,226,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#EEF6FC"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.navy})` }}>
                  <Icon size={21} className="text-white" />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: C.dark }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-20" style={{ background: C.dark }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative rounded-[32px] overflow-hidden">
              <img src={IMG.store} alt="Cửa hàng Phúc Thọ Mobile" className="w-full object-cover" style={{ height: "clamp(300px,32vw,440px)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,16,30,0.6) 0%, transparent 55%)" }} />
              <div className="absolute bottom-6 left-6 rounded-2xl px-5 py-3" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.13)" }}>
                <div className="font-extrabold" style={{ fontSize: "1.4rem", color: C.cyan }}>2015</div>
                <div className="text-xs" style={{ color: "rgba(240,246,255,0.55)" }}>Năm thành lập</div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.cyan }}>Về chúng tôi</p>
              <h2 className="font-extrabold text-white leading-tight mb-5" style={{ fontSize: "1.9rem", letterSpacing: "-0.02em" }}>
                Hơn 10 năm đồng hành<br />cùng công nghệ Việt
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(240,246,255,0.52)" }}>
                Phúc Thọ Mobile được thành lập với sứ mệnh mang công nghệ đỉnh cao đến gần hơn với người dùng Việt Nam. Chúng tôi cam kết cung cấp sản phẩm chính hãng, dịch vụ tận tâm và trải nghiệm mua sắm đẳng cấp.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(240,246,255,0.52)" }}>
                Với hơn 50.000 khách hàng tin tưởng và hệ thống phân phối trải rộng toàn quốc, Phúc Thọ Mobile tự hào là điểm đến tin cậy cho mọi nhu cầu công nghệ.
              </p>
              <div className="flex gap-10 mb-8 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {[["50K+", "Khách hàng"], ["100+", "Thương hiệu"], ["10+", "Năm"]].map(([n, l]) => (
                  <div key={l}><div className="font-extrabold text-xl" style={{ color: C.cyan }}>{n}</div><div className="text-xs mt-0.5" style={{ color: "rgba(240,246,255,0.4)" }}>{l}</div></div>
                ))}
              </div>
              <BtnOutline className="text-sm px-7 py-3">Tìm hiểu thêm <ArrowRight size={15} /></BtnOutline>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONS */}
      <section className="py-20" style={{ background: "#F5F9FF" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.cyan }}>Khuyến mãi</p>
              <h2 className="font-extrabold" style={{ fontSize: "2rem", color: C.dark, letterSpacing: "-0.02em" }}>Ưu đãi đang diễn ra</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {PROMOTIONS.map((promo, i) => (
              <div key={i} className="bg-white rounded-[24px] overflow-hidden transition-all" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 40px rgba(0,0,0,0.09)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; }}>
                <div className="h-1.5" style={{ background: promo.accent }} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1.5"><Clock size={12} style={{ color: "#94A3B8" }} /><span className="text-xs" style={{ color: "#94A3B8" }}>{promo.time}</span></div>
                  <h3 className="font-bold text-base mb-2" style={{ color: C.dark }}>{promo.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748B" }}>{promo.desc}</p>
                  <a href="#" className="inline-flex items-center gap-1.5 font-semibold text-sm" style={{ color: promo.accent }}>
                    Xem ngay <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.cyan }}>Blog</p>
              <h2 className="font-extrabold" style={{ fontSize: "2rem", color: C.dark, letterSpacing: "-0.02em" }}>Tin công nghệ & cảm hứng</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <a key={i} href="#" className="group block bg-white rounded-[24px] overflow-hidden transition-all" style={{ border: "1px solid #E2EAF4" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(41,171,226,0.09)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div className="overflow-hidden h-48">
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: C.cyan }}>{n.tag}</span>
                  <h3 className="font-bold text-sm mt-2 mb-2 leading-snug" style={{ color: C.dark }}>{n.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#64748B" }}>{n.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: C.navy }}>Đọc thêm <ArrowRight size={12} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-16" style={{ background: C.dark, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.navy})` }}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(240,246,255,0.42)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PRODUCT DETAIL PAGE ─────────────────────────────────────────────────────
function ProductPage({ productId, setPage, setCartCount, cartCount }: { productId: number; setPage: (p: string) => void; setCartCount: (n: number) => void; cartCount: number }) {
  const product = PRODUCTS[productId] ?? PRODUCTS[0];
  const [activeImg, setActiveImg] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [storageIdx, setStorageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeSpecTab, setActiveSpecTab] = useState<"specs" | "desc" | "reviews">("specs");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const price = product.price + product.storages[storageIdx].extra;

  function handleAddCart() {
    setCartCount(cartCount + qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    setPage("checkout");
    window.scrollTo(0, 0);
  }

  return (
    <div style={{ background: "#F5F9FF", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8EFF8" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex items-center gap-2 pt-20">
          <button onClick={() => { setPage("home"); window.scrollTo(0,0); }} className="text-sm font-medium transition-colors flex items-center gap-1" style={{ color: C.navy }}>
            <ChevronLeft size={15} /> Trang chủ
          </button>
          <ChevronRight size={13} style={{ color: "#CBD5E1" }} />
          <span className="text-sm" style={{ color: "#94A3B8" }}>Điện thoại</span>
          <ChevronRight size={13} style={{ color: "#CBD5E1" }} />
          <span className="text-sm font-semibold" style={{ color: C.dark }}>{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── LEFT: Gallery ── */}
          <div>
            <div className="rounded-[28px] overflow-hidden mb-4 relative" style={{ background: "#E8F4FC" }}>
              <img src={product.gallery[activeImg]} alt={product.name} className="w-full object-cover" style={{ height: "clamp(340px,40vw,520px)" }} />
              {product.badge && (
                <span className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 rounded-full" style={badgeStyle(product.badge)}>{product.badge}</span>
              )}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ background: wishlisted ? "#FFF0F0" : "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
              >
                <Heart size={18} style={{ color: wishlisted ? "#EF4444" : "#94A3B8", fill: wishlisted ? "#EF4444" : "none" }} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className="flex-shrink-0 rounded-2xl overflow-hidden transition-all" style={{ width: 76, height: 76, border: activeImg === i ? `2.5px solid ${C.cyan}` : "2.5px solid transparent", background: "#E8F4FC" }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info ── */}
          <div className="flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />)}
              </div>
              <span className="text-xs font-semibold" style={{ color: "#64748B" }}>4.9 (328 đánh giá)</span>
              <span className="text-xs" style={{ color: "#CBD5E1" }}>|</span>
              <span className="text-xs font-semibold" style={{ color: "#10B981" }}>Còn hàng</span>
            </div>

            <h1 className="font-extrabold mb-2" style={{ fontSize: "clamp(1.6rem,3vw,2rem)", color: C.dark, letterSpacing: "-0.02em" }}>{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-extrabold" style={{ fontSize: "1.8rem", color: C.navy }}>{fmt(price)}</span>
              <span className="text-sm line-through" style={{ color: "#CBD5E1" }}>{fmt(Math.round(price * 1.12))}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#FEF3C7", color: "#D97706" }}>Tiết kiệm {fmt(Math.round(price * 0.12))}</span>
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-sm font-bold mb-3" style={{ color: C.dark }}>
                Màu sắc: <span className="font-semibold" style={{ color: "#64748B" }}>{product.colors[colorIdx].name}</span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((col, i) => (
                  <button key={i} onClick={() => setColorIdx(i)} className="relative w-9 h-9 rounded-full transition-all" title={col.name}
                    style={{ background: col.hex, border: colorIdx === i ? `3px solid ${C.cyan}` : "3px solid transparent", boxShadow: colorIdx === i ? "0 0 0 2px #fff, 0 0 0 4px #29ABE2" : "0 2px 8px rgba(0,0,0,0.2)" }}>
                    {colorIdx === i && <Check size={14} className="absolute inset-0 m-auto text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="mb-6">
              <p className="text-sm font-bold mb-3" style={{ color: C.dark }}>Dung lượng bộ nhớ:</p>
              <div className="flex gap-2 flex-wrap">
                {product.storages.map((s, i) => (
                  <button key={i} onClick={() => setStorageIdx(i)} className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                    style={storageIdx === i
                      ? { background: C.cyan, color: "#fff", boxShadow: `0 0 18px rgba(41,171,226,0.3)` }
                      : { border: "1.5px solid #D1DCE8", color: "#4A5568", background: "#fff" }}>
                    {s.label}
                    {s.extra > 0 && <span className="text-[10px] ml-1" style={{ color: storageIdx === i ? "rgba(255,255,255,0.75)" : "#94A3B8" }}>+{fmt(s.extra)}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-7">
              <p className="text-sm font-bold" style={{ color: C.dark }}>Số lượng:</p>
              <div className="flex items-center gap-0 rounded-full overflow-hidden" style={{ border: "1.5px solid #D1DCE8" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center transition-colors" style={{ color: "#64748B" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F0F6FF")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center font-bold text-sm" style={{ color: C.dark }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center transition-colors" style={{ color: "#64748B" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F0F6FF")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <Plus size={15} />
                </button>
              </div>
              <span className="text-xs" style={{ color: "#94A3B8" }}>Tổng: <strong style={{ color: C.navy }}>{fmt(price * qty)}</strong></span>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-7">
              <button
                onClick={handleAddCart}
                className="flex-1 py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2"
                style={{ border: `2px solid ${added ? "#10B981" : C.navy}`, color: added ? "#10B981" : C.navy, background: added ? "#F0FDF4" : "#fff" }}
              >
                {added ? <><CheckCircle2 size={17} /> Đã thêm!</> : <><ShoppingCart size={17} /> Thêm vào giỏ</>}
              </button>
              <BtnPrimary className="flex-1 py-4 text-sm" onClick={handleBuyNow}>
                Mua ngay <ArrowRight size={17} />
              </BtnPrimary>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, text: "Bảo hành 12 tháng chính hãng" },
                { icon: RotateCcw, text: "Đổi trả 30 ngày miễn phí" },
                { icon: Truck, text: "Giao hàng trong ngày tại TP.HCM" },
                { icon: BadgeCheck, text: "100% hàng chính hãng" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-2xl" style={{ background: "#EEF6FC" }}>
                  <Icon size={15} style={{ color: C.cyan, flexShrink: 0 }} />
                  <span className="text-xs font-medium" style={{ color: "#4A5568" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spec Tabs */}
        <div className="mt-14 bg-white rounded-[28px] overflow-hidden" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}>
          <div className="flex border-b" style={{ borderColor: "#E8EFF8" }}>
            {(["specs", "desc", "reviews"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveSpecTab(tab)}
                className="px-6 py-4 text-sm font-semibold transition-all flex-1"
                style={{ color: activeSpecTab === tab ? C.cyan : "#64748B", borderBottom: activeSpecTab === tab ? `2.5px solid ${C.cyan}` : "2.5px solid transparent", background: activeSpecTab === tab ? "#F0FAFF" : "transparent" }}>
                {tab === "specs" ? "Thông số kỹ thuật" : tab === "desc" ? "Mô tả sản phẩm" : "Đánh giá (328)"}
              </button>
            ))}
          </div>
          <div className="p-8">
            {activeSpecTab === "specs" && (
              <div className="grid sm:grid-cols-2 gap-2">
                {Object.entries(product.fullSpecs).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 py-3 px-4 rounded-2xl" style={{ background: "#F8FAFF" }}>
                    <span className="text-sm font-semibold w-28 flex-shrink-0" style={{ color: "#64748B" }}>{k}</span>
                    <span className="text-sm font-bold" style={{ color: C.dark }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeSpecTab === "desc" && (
              <div className="prose max-w-none">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A5568" }}>
                  <strong style={{ color: C.dark }}>{product.name}</strong> là sản phẩm flagship mới nhất tại Phúc Thọ Mobile, mang đến hiệu năng đỉnh cao và trải nghiệm người dùng xuất sắc. Được trang bị chip xử lý mạnh mẽ nhất thế giới hiện tại, chiếc điện thoại này xử lý mượt mà mọi tác vụ từ chơi game đến chỉnh sửa video 4K.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A5568" }}>
                  Hệ thống camera đa ống kính với công nghệ AI tiên tiến cho phép chụp ảnh chuyên nghiệp trong mọi điều kiện ánh sáng. Pin dung lượng lớn kết hợp sạc nhanh đảm bảo bạn luôn kết nối suốt cả ngày dài.
                </p>
                <ul className="space-y-2">
                  {product.specs.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "#4A5568" }}>
                      <Check size={14} style={{ color: C.cyan }} /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeSpecTab === "reviews" && (
              <div>
                <div className="flex items-center gap-8 mb-8 p-6 rounded-2xl" style={{ background: "#F8FAFF" }}>
                  <div className="text-center">
                    <div className="font-extrabold" style={{ fontSize: "3rem", color: C.navy, lineHeight: 1 }}>4.9</div>
                    <div className="flex gap-0.5 justify-center mt-1">{[1,2,3,4,5].map(s => <Star key={s} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />)}</div>
                    <div className="text-xs mt-1" style={{ color: "#94A3B8" }}>328 đánh giá</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs w-3 text-right" style={{ color: "#64748B" }}>{star}</span>
                        <Star size={10} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                        <div className="flex-1 rounded-full overflow-hidden" style={{ background: "#E2EAF4", height: 6 }}>
                          <div className="h-full rounded-full" style={{ background: "#F59E0B", width: `${star === 5 ? 82 : star === 4 ? 13 : star === 3 ? 3 : star === 2 ? 1 : 1}%` }} />
                        </div>
                        <span className="text-xs w-6" style={{ color: "#94A3B8" }}>{star === 5 ? 82 : star === 4 ? 13 : star === 3 ? 3 : star === 2 ? 1 : 1}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {[{ name: "Nguyễn Văn Anh", time: "3 ngày trước", text: "Máy cực kỳ mượt, camera siêu đẹp. Rất hài lòng với lần mua này!", stars: 5 },
                  { name: "Trần Thị Mai", time: "1 tuần trước", text: "Sản phẩm chính hãng, giao hàng nhanh, nhân viên tư vấn nhiệt tình.", stars: 5 },
                  { name: "Lê Quốc Huy", time: "2 tuần trước", text: "Pin trâu, màn hình đẹp. Sẽ giới thiệu cho bạn bè.", stars: 4 }].map((r, i) => (
                  <div key={i} className="py-5 border-b last:border-0" style={{ borderColor: "#E8EFF8" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.navy})` }}>
                          {r.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm" style={{ color: C.dark }}>{r.name}</div>
                          <div className="text-xs" style={{ color: "#94A3B8" }}>{r.time}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} size={12} style={{ color: s <= r.stars ? "#F59E0B" : "#E2EAF4", fill: s <= r.stars ? "#F59E0B" : "#E2EAF4" }} />)}</div>
                    </div>
                    <p className="text-sm" style={{ color: "#4A5568" }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Other products */}
        <div className="mt-14">
          <h2 className="font-extrabold mb-6" style={{ fontSize: "1.4rem", color: C.dark, letterSpacing: "-0.02em" }}>Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.filter(p => p.id !== productId).map(p => (
              <div key={p.id} className="bg-white rounded-[24px] overflow-hidden transition-all cursor-pointer" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
                onClick={() => { setActiveImg(0); setColorIdx(0); setStorageIdx(0); setQty(1); window.scrollTo(0,0); }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(41,171,226,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"; }}>
                <div className="p-4 pb-0" style={{ background: "#EEF6FC" }}>
                  <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-xl" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1" style={{ color: C.dark }}>{p.name}</h3>
                  <div className="font-extrabold text-sm" style={{ color: C.navy }}>{fmt(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────
function CheckoutPage({ productId, setPage }: { productId: number; setPage: (p: string) => void }) {
  const product = PRODUCTS[productId] ?? PRODUCTS[0];
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [payMethod, setPayMethod] = useState("cod");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [storageIdx] = useState(0);
  const price = product.price + product.storages[storageIdx].extra;
  const shipping = price >= 2000000 ? 0 : 30000;
  const total = price + shipping;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập họ tên";
    if (!/^0\d{9}$/.test(form.phone)) e.phone = "Số điện thoại không hợp lệ";
    if (!form.address.trim()) e.address = "Vui lòng nhập địa chỉ";
    if (!form.city.trim()) e.city = "Vui lòng chọn tỉnh/thành";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 1 && !validate()) return;
    if (step === 2) { setPage("success"); window.scrollTo(0,0); return; }
    setStep((step + 1) as 1|2|3);
    window.scrollTo(0, 0);
  }

  const CITIES = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Biên Hòa", "Vũng Tàu", "Nha Trang"];

  return (
    <div style={{ background: "#F5F9FF", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #E8EFF8" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex items-center gap-2 pt-20">
          <button onClick={() => { setPage("product"); window.scrollTo(0,0); }} className="text-sm font-medium flex items-center gap-1" style={{ color: C.navy }}>
            <ChevronLeft size={15} /> Quay lại
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex items-center justify-center gap-0 mb-10">
          {[{ n: 1, label: "Thông tin" }, { n: 2, label: "Thanh toán" }, { n: 3, label: "Hoàn thành" }].map(({ n, label }, i) => (
            <div key={n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                  style={{ background: step >= n ? C.cyan : "#E2EAF4", color: step >= n ? "#fff" : "#94A3B8" }}>
                  {step > n ? <Check size={16} /> : n}
                </div>
                <span className="text-xs font-semibold mt-1.5" style={{ color: step >= n ? C.navy : "#94A3B8" }}>{label}</span>
              </div>
              {i < 2 && <div className="w-24 h-0.5 mb-5 mx-2 transition-all" style={{ background: step > n ? C.cyan : "#E2EAF4" }} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left form */}
          <div className="bg-white rounded-[28px] p-8" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}>
            {step === 1 && (
              <>
                <h2 className="font-extrabold text-xl mb-7" style={{ color: C.dark, letterSpacing: "-0.02em" }}>Thông tin giao hàng</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Họ và tên *", placeholder: "Nguyễn Văn A", type: "text" },
                    { key: "phone", label: "Số điện thoại *", placeholder: "0901234567", type: "tel" },
                    { key: "email", label: "Email", placeholder: "email@example.com", type: "email" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: "#4A5568" }}>{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={(form as any)[key]}
                        onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
                        className="w-full px-4 py-3 rounded-2xl text-sm transition-all outline-none"
                        style={{ border: errors[key] ? "1.5px solid #EF4444" : "1.5px solid #D1DCE8", fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.dark }}
                        onFocus={e => (e.currentTarget.style.borderColor = C.cyan)}
                        onBlur={e => (e.currentTarget.style.borderColor = errors[key] ? "#EF4444" : "#D1DCE8")}
                      />
                      {errors[key] && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors[key]}</p>}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#4A5568" }}>Địa chỉ *</label>
                    <input
                      type="text"
                      placeholder="Số nhà, tên đường, phường/xã..."
                      value={form.address}
                      onChange={e => { setForm({ ...form, address: e.target.value }); setErrors({ ...errors, address: "" }); }}
                      className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                      style={{ border: errors.address ? "1.5px solid #EF4444" : "1.5px solid #D1DCE8", fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.dark }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.cyan)}
                      onBlur={e => (e.currentTarget.style.borderColor = errors.address ? "#EF4444" : "#D1DCE8")}
                    />
                    {errors.address && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#4A5568" }}>Tỉnh / Thành phố *</label>
                    <div className="relative">
                      <select
                        value={form.city}
                        onChange={e => { setForm({ ...form, city: e.target.value }); setErrors({ ...errors, city: "" }); }}
                        className="w-full px-4 py-3 rounded-2xl text-sm outline-none appearance-none"
                        style={{ border: errors.city ? "1.5px solid #EF4444" : "1.5px solid #D1DCE8", fontFamily: "'Plus Jakarta Sans', sans-serif", color: form.city ? C.dark : "#94A3B8", background: "#fff" }}
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94A3B8" }} />
                    </div>
                    {errors.city && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.city}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#4A5568" }}>Ghi chú đơn hàng</label>
                    <textarea
                      placeholder="Yêu cầu đặc biệt về giao hàng, giờ giao..."
                      value={form.note}
                      onChange={e => setForm({ ...form, note: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                      style={{ border: "1.5px solid #D1DCE8", fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.dark }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.cyan)}
                      onBlur={e => (e.currentTarget.style.borderColor = "#D1DCE8")}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-extrabold text-xl mb-2" style={{ color: C.dark, letterSpacing: "-0.02em" }}>Phương thức thanh toán</h2>
                <p className="text-sm mb-7" style={{ color: "#64748B" }}>Chọn phương thức thanh toán phù hợp với bạn</p>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(({ id, icon: Icon, label, desc }) => (
                    <button key={id} onClick={() => setPayMethod(id)} className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                      style={{ border: payMethod === id ? `2px solid ${C.cyan}` : "2px solid #E2EAF4", background: payMethod === id ? "#F0FAFF" : "#fff" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: payMethod === id ? C.cyan : "#EEF6FC" }}>
                        <Icon size={20} style={{ color: payMethod === id ? "#fff" : "#64748B" }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm" style={{ color: C.dark }}>{label}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{desc}</div>
                      </div>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: payMethod === id ? `none` : "2px solid #CBD5E1", background: payMethod === id ? C.cyan : "transparent" }}>
                        {payMethod === id && <Check size={12} className="text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                {payMethod === "bank" && (
                  <div className="mt-5 p-5 rounded-2xl" style={{ background: "#F0FAFF", border: `1px solid ${C.cyan}30` }}>
                    <p className="text-xs font-bold mb-3" style={{ color: C.navy }}>Thông tin chuyển khoản:</p>
                    <div className="space-y-1.5 text-sm" style={{ color: "#4A5568" }}>
                      <p><strong>Ngân hàng:</strong> Vietcombank</p>
                      <p><strong>Số TK:</strong> 1234 5678 9012</p>
                      <p><strong>Chủ TK:</strong> CÔNG TY PHÚC THỌ MOBILE</p>
                      <p><strong>Nội dung:</strong> PT + Số điện thoại của bạn</p>
                    </div>
                  </div>
                )}

                {payMethod === "ewallet" && (
                  <div className="mt-5 grid grid-cols-4 gap-3">
                    {[["MoMo", "#B0006D"], ["ZaloPay", "#006AF5"], ["VNPay", "#EE0033"], ["ShopeePay", "#EE4D2D"]].map(([name, color]) => (
                      <div key={name} className="py-3 rounded-2xl flex items-center justify-center font-bold text-xs text-white" style={{ background: color }}>
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={() => setStep((step - 1) as 1|2)} className="px-7 py-4 rounded-full font-bold text-sm transition-all" style={{ border: "1.5px solid #D1DCE8", color: "#64748B" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = C.navy)} onMouseLeave={e => (e.currentTarget.style.borderColor = "#D1DCE8")}>
                  Quay lại
                </button>
              )}
              <BtnPrimary className="flex-1 py-4 text-sm" onClick={handleNext}>
                {step === 1 ? <>Tiếp tục <ArrowRight size={16} /></> : <>Đặt hàng ngay <Check size={16} /></>}
              </BtnPrimary>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-white rounded-[28px] p-6 sticky top-24" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}>
              <h3 className="font-extrabold text-base mb-5" style={{ color: C.dark, letterSpacing: "-0.01em" }}>Đơn hàng của bạn</h3>
              <div className="flex gap-4 mb-5 pb-5" style={{ borderBottom: "1px solid #E8EFF8" }}>
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-2xl flex-shrink-0" style={{ background: "#EEF6FC" }} />
                <div className="flex-1">
                  <h4 className="font-bold text-sm mb-1" style={{ color: C.dark }}>{product.name}</h4>
                  <p className="text-xs mb-2" style={{ color: "#94A3B8" }}>128GB · Đen huyền bí</p>
                  <div className="font-extrabold text-sm" style={{ color: C.navy }}>{fmt(price)}</div>
                </div>
              </div>
              <div className="space-y-3 mb-5 pb-5" style={{ borderBottom: "1px solid #E8EFF8" }}>
                {[["Tạm tính", fmt(price)], ["Phí giao hàng", shipping === 0 ? "Miễn phí" : fmt(shipping)], ["Giảm giá", "- " + fmt(Math.round(price * 0.12))]].map(([l, v]) => (
                  <div key={l} className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "#64748B" }}>{l}</span>
                    <span className="text-sm font-semibold" style={{ color: l === "Giảm giá" ? "#10B981" : C.dark }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-base" style={{ color: C.dark }}>Tổng cộng</span>
                <span className="font-extrabold text-xl" style={{ color: C.navy }}>{fmt(total - Math.round(price * 0.12))}</span>
              </div>
              <div className="space-y-2">
                {[{ icon: Shield, text: "Thanh toán bảo mật SSL" }, { icon: Package2, text: "Đóng gói cẩn thận" }, { icon: RotateCcw, text: "Đổi trả 30 ngày" }].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon size={13} style={{ color: C.cyan }} />
                    <span className="text-xs" style={{ color: "#64748B" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SUCCESS PAGE ─────────────────────────────────────────────────────────────
function SuccessPage({ setPage }: { setPage: (p: string) => void }) {
  const orderId = "PTM" + Math.floor(Math.random() * 900000 + 100000);
  return (
    <div style={{ background: "#F5F9FF", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="max-w-lg w-full mx-auto px-6 py-20 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: "linear-gradient(135deg, #29ABE2, #1B3A6B)", boxShadow: "0 0 48px rgba(41,171,226,0.35)" }}>
          <CheckCircle2 size={44} className="text-white" />
        </div>
        <h1 className="font-extrabold mb-3" style={{ fontSize: "2rem", color: C.dark, letterSpacing: "-0.02em" }}>Đặt hàng thành công!</h1>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748B" }}>
          Cảm ơn bạn đã tin tưởng Phúc Thọ Mobile. Đơn hàng của bạn đang được xử lý và sẽ được giao trong thời gian sớm nhất.
        </p>
        <div className="bg-white rounded-[24px] p-6 mb-8 text-left" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}>
          {[["Mã đơn hàng", orderId], ["Trạng thái", "Đang xử lý"], ["Thời gian giao hàng", "1-3 ngày làm việc"], ["Hỗ trợ", "1800 1234"]].map(([l, v]) => (
            <div key={l} className="flex justify-between items-center py-2.5" style={{ borderBottom: "1px solid #F0F6FF" }}>
              <span className="text-sm" style={{ color: "#64748B" }}>{l}</span>
              <span className="text-sm font-bold" style={{ color: l === "Mã đơn hàng" ? C.cyan : l === "Trạng thái" ? "#10B981" : C.dark }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <BtnOutline dark={false} className="px-7 py-3.5 text-sm" onClick={() => { setPage("home"); window.scrollTo(0,0); }}>
            Tiếp tục mua sắm
          </BtnOutline>
          <BtnPrimary className="px-7 py-3.5 text-sm" onClick={() => { setPage("home"); window.scrollTo(0,0); }}>
            Về trang chủ
          </BtnPrimary>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<"home" | "product" | "checkout" | "success">("home");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [cartCount, setCartCount] = useState(2);

  return (
  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
    {/* Thay thế Header cũ */}
    <Header 
      page={page} 
      setPage={setPage as (p: string) => void} 
      cartCount={cartCount}
      onLoginClick={() => setIsLoginModalOpen(true)}
    />

    {/* Thêm trang Products */}
    {page === "products" && <ProductsPage products={PRODUCTS} setPage={setPage as (p: string) => void} setSelectedProductId={setSelectedProductId} />}
    
    {/* Các trang khác giữ nguyên */}
    {page === "home" && <HomePage setPage={setPage as (p: string) => void} setSelectedProductId={setSelectedProductId} />}
    {page === "product" && <ProductPage productId={selectedProductId} setPage={setPage as (p: string) => void} setCartCount={setCartCount} cartCount={cartCount} />}
    {page === "checkout" && <CheckoutPage productId={selectedProductId} setPage={setPage as (p: string) => void} />}
    {page === "success" && <SuccessPage setPage={setPage as (p: string) => void} />}

    {page !== "success" && <Footer />}

    {/* Thêm Login Modal */}
    <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

    {/* Floating chat giữ nguyên */}
    <a href="#" title="Chat tư vấn" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
      style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.navy})`, boxShadow: "0 4px 24px rgba(41,171,226,0.38)" }}>
      <MessageCircle size={24} className="text-white" />
    </a>
  </div>
  );
  export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
    );
  }
}
