    import React from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../service";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
    const navigate = useNavigate();

  const signup = async (data) => {
    try{
        const respond = await apiConnector('POST', '/loginSignup/signup', data)
        console.log("Signup successful:", respond.data);
        toast.success("Signup successful....");
        navigate("/login");
    }
    catch(error){
        console.error("Signup failed:", error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            return;
        }
    }
  }

  const onSubmit = (data) => {
    signup(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-8 py-10 px-6 sm:px-10 bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Join our community
        </div>

       
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Create your{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Free Account
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
          Sign up today to start managing your coupons efficiently and never miss out on great deals again.
        </p>

       
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-5 text-left"
        >
          
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-100"
            >
              Email
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs">
                @
              </span>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-white/5 px-3 py-2 pl-8 text-sm text-slate-100 placeholder-slate-500 shadow-sm transition-colors focus:outline-none focus:ring-2 ${
                  errors.Email
                    ? "border-red-500 focus:ring-red-500/70"
                    : "border-white/15 focus:border-emerald-400 focus:ring-emerald-500/60"
                }`}
                {...register("Email", { required: "Email is required" })}
              />
            </div>
            {errors.Email && (
              <p className="text-xs text-red-400">{String(errors.Email.message)}</p>
            )}
          </div>

          
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-100"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-white/5 px-3 py-2 pr-20 text-sm text-slate-100 placeholder-slate-500 shadow-sm transition-colors focus:outline-none focus:ring-2 ${
                  errors.Password
                    ? "border-red-500 focus:ring-red-500/70"
                    : "border-white/15 focus:border-emerald-400 focus:ring-emerald-500/60"
                }`}
                {...register("Password", { required: "Password is required" })}
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[11px] text-slate-500">
                Min 8 characters
              </span>
            </div>
            {errors.Password && (
              <p className="text-xs text-red-400">
                {String(errors.Password.message)}
              </p>
            )}
          </div>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <a
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full border border-slate-600/80 bg-slate-900/40 text-sm sm:text-base font-semibold text-slate-100 shadow-sm hover:bg-slate-800/80 hover:border-slate-500 transition-all hover:-translate-y-0.5"
            >
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
