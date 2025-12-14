import React from "react";
import { FaHeart } from "react-icons/fa6";
export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-center px-4">
            <div className="max-w-3xl w-full text-center space-y-8 py-12 px-6 bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium uppercase tracking-wide">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Smart coupon management
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Coupon Management
                    </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
                    Store, track, and manage all your coupons in one secure dashboard so you never miss a deal again.
                </p>


                <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
                    Login or create a free account to get started.
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <a
                        href="/login"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-cyan-400 transition-transform hover:-translate-y-0.5"
                    >
                        Login
                    </a>

                    <a
                        href="/signup"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-600 text-sm sm:text-base font-semibold text-slate-100 hover:bg-slate-800/70 transition-colors"
                    >
                        Create account
                    </a>
                </div>

                <div className="text-xs sm:text-sm text-slate-400 flex items-center justify-center gap-1 pt-4">
                    <p>The application is made with love</p>
                    <p className="text-red-600">
                        < FaHeart />
                    </p>
                </div>
            </div>
        </div>
    );
}
