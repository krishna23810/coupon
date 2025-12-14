import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {apiConnector} from "../service";
import { toast } from "react-hot-toast";
import {useNavigate, Link} from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigatory = useNavigate();
  
  const loginUser = async (data) => {
    try{
     const respond =  await apiConnector('POST', '/loginSignup/login', data)
      console.log("Login successful:", respond.data);
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(respond.data));
      // chack user deatils are present or not
      const userId = respond.data.user._id;
      const check = await apiConnector('GET', '/loginSignup/userDetails/' + userId);
      console.log("User details check:", check.data);
      console.log("User details status:", check.data.status);
      if(check.data.details.length === 0){
        toast.error("User details not found, please complete your profile");
        return navigatory("/userDetails");
      }
      navigatory("/deashboard");
      
    }catch(error){
      toast.error("Login failed. Please check your credentials.");
        console.error("Login failed:", error);
      };
  };
  const onSubmit = (data) => loginUser(data);
  
  return (
    // FULL PAGE BACKGROUND, EDGE TO EDGE
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      {/* soft glow in center */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="h-80 w-80 bg-blue-500/15 blur-3xl rounded-full" />
      </div>

      {/* main content */}
      <div className="relative w-full">
        <div className="backdrop-blur-xl bg-slate-900/70 border-t border-b border-white/10 shadow-2xl rounded-none px-6 md:px-16 py-10 text-slate-100 w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <form className="space-y-5 max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-slate-100">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                {...register("Email", { required: "Email is required" })}
              />
              {errors.Email && (
                <p className="text-xs text-red-400">{errors.Email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-100">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 pr-10 text-sm text-slate-100 placeholder-slate-400 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                {...register("Password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-300 hover:text-white"
                >
                  <p className="select-none text-blue-600" >

                  {showPassword ? "Hide" : "Show"}
                </p>
                </button>
              </div>
              {errors.Password && (
                <p className="text-xs text-red-400">{errors.Password.message}</p>
              )}
            </div>

            {/* Extras */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <div></div>
              <button
                type="button"
                className="text-blue-300 hover:text-blue-200 hover:underline"
              >
                <p className="select-none text-blue-600">

                Forgot password?
                </p>
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full sm:w-64 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-400 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-300 hover:text-blue-200 hover:underline"
              >
              Sign up

            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
