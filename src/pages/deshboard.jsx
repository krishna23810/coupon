import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data here if you store tokens
    localStorage.removeItem("user");
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-5xl space-y-8 py-10 px-4 sm:px-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Coupon Management
              </span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Manage products, carts, and coupon codes from a single dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Dashboard
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/70 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-500 hover:-translate-y-0.5 transition-all"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <p className="text-red-500">

              Logout
              </p>
            </button>
          </div>
        </header>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Cart / Products card */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 text-sm">
                🛒
              </span>
              Cart & Products
            </h2>
            <p className="text-sm text-slate-300">
              Add new products to the cart and review everything the user is about to purchase.
            </p>

            <div className="space-y-3">
                <button
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-cyan-400 hover:-translate-y-0.5 transition-transform"
              >
                <Link to="/create-product"
                className="w-full">
                <p
                className="text-white ">


                Create Product
                </p>
                </Link>
              </button>
              

              <Link to="/cart-products">
                <button
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-slate-700 bg-slate-900/60 text-sm font-semibold text-slate-600 hover:bg-slate-800/80 hover:border-slate-500 hover:-translate-y-0.5 transition-all hover:text-slate-800"
                >
                  View Cart Products
                </button>
              </Link>
            </div>
          </section>

          {/* Coupons card */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300 text-sm">
                🎟️
              </span>
              Coupon Codes
            </h2>
            <p className="text-sm text-slate-300">
              Create new coupon codes and inspect all existing discounts available in the system.
            </p>

            <div className="space-y-3">
                <button
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:from-violet-400 hover:to-fuchsia-400 hover:-translate-y-0.5 transition-transform"
              >
                <Link to="/create-coupon"
                className="w-full">
                <p
                className="text-white ">


                Create Coupon
                </p>
                </Link>
              </button>

              <Link to="/coupons">
                <button
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-slate-700 bg-slate-900/60 text-sm font-semibold text-slate-600 hover:bg-slate-800/80 hover:border-slate-500 hover:-translate-y-0.5 transition-all hover:text-slate-800"
                >
                  View All Coupons
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
