import React from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../service";
import { toast } from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function UserDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const detailUser = async (data) => {
    try{
      const user = localStorage.getItem("user");
      const userID = JSON.parse(user).user._id;
      const respond = await apiConnector('POST', `/user/details/${userID}`, {
        User_Context: {
          userTier: data.userTier,
          country: data.country,
          lifetimeSpend: data.lifetimeSpend ? parseFloat(data.lifetimeSpend) : 0,
          ordersPlaced: data.ordersPlaced ? parseInt(data.ordersPlaced) : 0,
          couponsUsed: []
        },
    });
      console.log("User details submission successful:", respond.data);
      toast.success("User details submitted successfully");
      navigate("/deashboard"); 
    }
    catch(error){
      console.error("User details submission failed:", error);
    }
  }
  const onSubmit = (data) => {
    detailUser(data);
    // console.log("Form Data:", data);
  };

  const userTier = watch("userTier");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8 py-10 px-6 sm:px-10 bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            User Details
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Manage user context and cart metadata for better coupon decisions.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-left"
        >
          {/* User tier */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-100">
              User tier
            </label>
            <div className="relative">
              <select
                {...register("userTier", { required: "User tier is required" })}
                className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 pr-9 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
                defaultValue="NEW"
              >
                <option value="NEW">NEW</option>
                <option value="REGULAR">REGULAR</option>
                <option value="GOLD">GOLD</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 text-xs">
                ⌄
              </span>
            </div>
            {errors.userTier && (
              <p className="text-xs text-red-400">
                {String(errors.userTier.message)}
              </p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-100">
              Country
            </label>
            <div className="relative">
              <select
                {...register("country", { required: "Country is required" })}
                className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 pr-9 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
                defaultValue="USA"
              >
                <option value="USA">USA</option>
                <option value="CA">CANADA</option>
                <option value="UK">UK</option>
                <option value="AU">AUSTRALIA</option>
                <option value="IN">INDIA</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 text-xs">
                ⌄
              </span>
            </div>
            {errors.country && (
              <p className="text-xs text-red-400">
                {String(errors.country.message)}
              </p>
            )}
          </div>

          {/* Lifetime spend – only if not NEW */}
          {userTier && userTier !== "NEW" && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-100">
                Lifetime spend (in INR)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("lifetimeSpend", {
                  required: "Lifetime spend is required for existing users",
                  min: { value: 0, message: "Value cannot be negative" },
                })}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
              />
              {errors.lifetimeSpend && (
                <p className="text-xs text-red-400">
                  {String(errors.lifetimeSpend.message)}
                </p>
              )}
            </div>
          )}

          {/* Orders placed */}
          {userTier && userTier !== "NEW" && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-100">
              Orders placed
            </label>
            <input
              type="number"
              {...register("ordersPlaced", {
                required: "Orders placed is required",
                min: { value: 0, message: "Value cannot be negative" },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
            />
            {errors.ordersPlaced && (
              <p className="text-xs text-red-400">
                {String(errors.ordersPlaced.message)}
              </p>
            )}
          </div>)}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-cyan-400 transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Save details"}
          </button>
        </form>
      </div>
    </div>
  );
}
