import React, { useState } from "react";
import { X, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "./AuthContext";

const C = { cyan: "#29ABE2", navy: "#1B3A6B", dark: "#07101E" };

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Signup form
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!loginForm.email || !loginForm.password) {
        setError("Vui lòng điền đầy đủ thông tin");
        setLoading(false);
        return;
      }

      await login(loginForm.email, loginForm.password);
      setLoginForm({ email: "", password: "" });
      onClose();
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!signupForm.name || !signupForm.email || !signupForm.phone || !signupForm.password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    setLoading(true);

    try {
      await signup(signupForm.name, signupForm.email, signupForm.phone, signupForm.password);
      setSignupForm({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
      onClose();
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[28px] p-8 relative"
        style={{ background: "white" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} style={{ color: C.dark }} />
        </button>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setError("");
              }}
              className="pb-3 text-base font-bold transition-all relative"
              style={{
                color: tab === t ? C.navy : "#94A3B8",
              }}
            >
              {t === "login" ? "Đăng nhập" : "Đăng ký"}
              {tab === t && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                  style={{ background: C.cyan }}
                />
              )}
            </button>
          ))}
        </div>

        {/* LOGIN FORM */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: C.dark }}>
                Email
              </label>
              <div className="flex items-center px-4 py-3 rounded-xl border" style={{ borderColor: C.navy + "30" }}>
                <Mail size={18} style={{ color: "#94A3B8" }} className="mr-2" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="flex-1 outline-none text-sm bg-transparent"
                  style={{ color: C.dark }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: C.dark }}>
                Mật khẩu
              </label>
              <div className="flex items-center px-4 py-3 rounded-xl border" style={{ borderColor: C.navy + "30" }}>
                <Lock size={18} style={{ color: "#94A3B8" }} className="mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="flex-1 outline-none text-sm bg-transparent"
                  style={{ color: C.dark }}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
              style={{ background: C.cyan, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <p className="text-center text-xs" style={{ color: "#94A3B8" }}>
              Quên mật khẩu?{" "}
              <a href="#" className="font-bold hover:underline" style={{ color: C.cyan }}>
                Đặt lại
              </a>
            </p>
          </form>
        )}

        {/* SIGNUP FORM */}
        {tab === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: C.dark }}>
                Họ và tên
              </label>
              <div className="flex items-center px-4 py-3 rounded-xl border" style={{ borderColor: C.navy + "30" }}>
                <User size={18} style={{ color: "#94A3B8" }} className="mr-2" />
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className="flex-1 outline-none text-sm bg-transparent"
                  style={{ color: C.dark }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: C.dark }}>
                Email
              </label>
              <div className="flex items-center px-4 py-3 rounded-xl border" style={{ borderColor: C.navy + "30" }}>
                <Mail size={18} style={{ color: "#94A3B8" }} className="mr-2" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="flex-1 outline-none text-sm bg-transparent"
                  style={{ color: C.dark }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: C.dark }}>
                Số điện thoại
              </label>
              <div className="flex items-center px-4 py-3 rounded-xl border" style={{ borderColor: C.navy + "30" }}>
                <Phone size={18} style={{ color: "#94A3B8" }} className="mr-2" />
                <input
                  type="tel"
                  placeholder="0982 123 456"
                  value={signupForm.phone}
                  onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                  className="flex-1 outline-none text-sm bg-transparent"
                  style={{ color: C.dark }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: C.dark }}>
                Mật khẩu
              </label>
              <div className="flex items-center px-4 py-3 rounded-xl border" style={{ borderColor: C.navy + "30" }}>
                <Lock size={18} style={{ color: "#94A3B8" }} className="mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="flex-1 outline-none text-sm bg-transparent"
                  style={{ color: C.dark }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: C.dark }}>
                Xác nhận mật khẩu
              </label>
              <div className="flex items-center px-4 py-3 rounded-xl border" style={{ borderColor: C.navy + "30" }}>
                <Lock size={18} style={{ color: "#94A3B8" }} className="mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                  className="flex-1 outline-none text-sm bg-transparent"
                  style={{ color: C.dark }}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
              style={{ background: C.cyan, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
