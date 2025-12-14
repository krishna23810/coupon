// import React from "react";
// import { useForm } from "react-hook-form";
// import { apiConnector } from "../service";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function CreateCoupon() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//   } = useForm();

//   const navigate = useNavigate();

//   const discountType = watch("discountType");
//   const selectedTiers = watch("allowedUserTiers") || [];
//   const selectedCountries = watch("allowedCountries") || [];
//   const firstOrderOnly = watch("firstOrderOnly");

//   const onSubmit = async (formData) => {
//     try {
//       const payload = {
//         code: formData.code,
//         description: formData.description,
//         discountType:
//           formData.discountType === "percentage" ? "PERCENT" : "FLAT",
//         discountValue: Number(formData.discountValue),
//         maxDiscountAmount: formData.maxDiscountAmount
//           ? Number(formData.maxDiscountAmount)
//           : undefined,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         usageLimitPerUser: formData.usageLimitPerUser
//           ? Number(formData.usageLimitPerUser)
//           : undefined,
//         User_based: {
//           firstOrderOnly: !!formData.firstOrderOnly,
//           minLifetimeSpend: formData.minLifetimeSpend
//             ? Number(formData.minLifetimeSpend)
//             : undefined,
//           minOrdersPlaced: formData.minOrdersPlaced
//             ? Number(formData.minOrdersPlaced)
//             : undefined,
//           allowedUserTiers: formData.allowedUserTiers,
//           allowedCountries: formData.allowedCountries,
//         },
//         Cart_based: {
//           minCartValue: formData.minCartValue
//             ? Number(formData.minCartValue)
//             : undefined,
//           applicableCategories : formData.applicableCategories,
//           excludedCategories : formData.excludedCategories ? formData.excludedCategories : [],
//         },
//         minItemsCount: formData.minItemsCount
//           ? Number(formData.minItemsCount)
//           : undefined,
//       };

//       const response = await apiConnector("POST", "/coupon/create", payload);
//       console.log(response);
//       toast.success(response.data?.message || "Coupon created successfully");
//       navigate("/coupons");
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Unable to create coupon"
//       );
//     }
//   };

//   // shared checkbox class
//   const checkboxClass =
//     "h-4 w-4 rounded-md border border-slate-500/80 bg-slate-900/80 " +
//     "text-emerald-400 focus:ring-2 focus:ring-emerald-500/70 focus:ring-offset-0 " +
//     "hover:border-emerald-400 transition-colors";

//   const pillLabelClass =
//     "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full " +
//     "bg-slate-900/70 border border-slate-700 hover:border-emerald-500/60 " +
//     "cursor-pointer text-xs text-slate-200 transition-colors";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-center px-4">
//       <div className="w-full max-w-4xl space-y-6 py-8 px-4 sm:px-8 bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur">
//         {/* Header */}
//         <div className="flex items-center justify-between gap-3">
//           <div className="space-y-1">
//             <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//               Create New Coupon
//             </h2>
//             <p className="text-sm text-slate-300">
//               Configure discount rules based on user profile and cart details.
//             </p>
//           </div>
//           <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium uppercase tracking-wide">
//             <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
//             Coupon builder
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Basic details */}
//           <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5 space-y-4">
//             <h3 className="text-sm font-semibold text-slate-100">
//               Basic information
//             </h3>
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-slate-100">
//                   Coupon code
//                 </label>
//                 <input
//                   type="text"
//                   {...register("code", { required: "Coupon code is required" })}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                   placeholder="FIRST100"
//                 />
//                 {errors.code && (
//                   <p className="text-xs text-red-400">{errors.code.message}</p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-slate-100">
//                   Discount type
//                 </label>
//                 <select
//                   {...register("discountType", {
//                     required: "Discount type is required",
//                   })}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                 >
//                   <option value="">Select discount type</option>
//                   <option value="percentage">Percentage</option>
//                   <option value="fixed">Fixed amount</option>
//                 </select>
//                 {errors.discountType && (
//                   <p className="text-xs text-red-400">
//                     {errors.discountType.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-slate-100">
//                   Discount value
//                 </label>
//                 <input
//                   type="number"
//                   {...register("discountValue", {
//                     required: "Discount value is required",
//                     min: { value: 1, message: "Must be greater than 0" },
//                   })}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                   placeholder={
//                     discountType === "percentage" ? "e.g., 10 for 10%" : "e.g., 100"
//                   }
//                 />
//                 {errors.discountValue && (
//                   <p className="text-xs text-red-400">
//                     {errors.discountValue.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-slate-100">
//                   Max discount amount (optional)
//                 </label>
//                 <input
//                   type="number"
//                   {...register("maxDiscountAmount")}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                   placeholder="Optional cap"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-slate-100">
//                 Description (optional)
//               </label>
//               <textarea
//                 {...register("description")}
//                 className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                 rows={2}
//                 placeholder="Short description of this coupon"
//               ></textarea>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-3">
//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-slate-100">
//                   Start date
//                 </label>
//                 <input
//                   type="date"
//                   {...register("startDate", { required: "Start date is required" })}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                 />
//                 {errors.startDate && (
//                   <p className="text-xs text-red-400">{errors.startDate.message}</p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-slate-100">
//                   End date
//                 </label>
//                 <input
//                   type="date"
//                   {...register("endDate", { required: "End date is required" })}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                 />
//                 {errors.endDate && (
//                   <p className="text-xs text-red-400">{errors.endDate.message}</p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-slate-100">
//                   Usage limit / user (optional)
//                 </label>
//                 <input
//                   type="number"
//                   {...register("usageLimitPerUser")}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                   placeholder="Optional"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* User-based block */}
//           <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5 space-y-4">
//             <h3 className="text-sm font-semibold text-slate-100">
//               User-based conditions
//             </h3>

//             <label className="inline-flex items-center gap-2 text-sm text-slate-200">
//               <input
//                 type="checkbox"
//                 {...register("firstOrderOnly")}
//                 className={checkboxClass}
//               />
//               <span>First order only</span>
//             </label>

//             <div className="grid gap-4 sm:grid-cols-2">
//               {/* User tiers */}
//               <div className="space-y-2">
//                 <label className="block text-xs font-medium text-slate-300">
//                   Allowed user tiers (optional)
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {["NEW", "REGULAR", "GOLD","EVERYONE"].map((tier) => (
//                     <label key={tier} className={pillLabelClass}>
//                       <input
//                         type="checkbox"
//                         value={tier}
//                         {...register("allowedUserTiers")}
//                         className={checkboxClass}
//                       />
//                       <span>{tier}</span>
//                     </label>
//                   ))}
//                 </div>
//                 <p className="text-[11px] text-slate-400">
//                   Selected:{" "}
//                   {selectedTiers && selectedTiers.length > 0
//                     ? (Array.isArray(selectedTiers)
//                         ? selectedTiers
//                         : [selectedTiers]
//                       ).join(", ")
//                     : "None"}
//                 </p>
//               </div>

//               {/* Countries */}
//               <div className="space-y-2">
//                 <label className="block text-xs font-medium text-slate-300">
//                   Allowed countries (optional)
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {[
//                     { code: "IN", label: "India" },
//                     { code: "USA", label: "United States" },
//                     { code: "CA", label: "Canada" },
//                     { code: "UK", label: "United Kingdom" },
//                     { code: "AU", label: "Australia" },
//                   ].map((c) => (
//                     <label key={c.code} className={pillLabelClass}>
//                       <input
//                         type="checkbox"
//                         value={c.code}
//                         {...register("allowedCountries")}
//                         className={checkboxClass}
//                       />
//                       <span>{c.label}</span>
//                     </label>
//                   ))}
//                 </div>
//                 <p className="text-[11px] text-slate-400">
//                   Selected:{" "}
//                   {selectedCountries && selectedCountries.length > 0
//                     ? (Array.isArray(selectedCountries)
//                         ? selectedCountries
//                         : [selectedCountries]
//                       ).join(", ")
//                     : "None"}
//                 </p>
//               </div>
//             </div>

//             {!firstOrderOnly && (
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="space-y-1">
//                   <label className="block text-xs font-medium text-slate-300">
//                     Min lifetime spend (optional)
//                   </label>
//                   <input
//                     type="number"
//                     {...register("minLifetimeSpend")}
//                     className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                     placeholder="₹"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-xs font-medium text-slate-300">
//                     Min orders placed (optional)
//                   </label>
//                   <input
//                     type="number"
//                     {...register("minOrdersPlaced")}
//                     className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                     placeholder="0"
//                   />
//                 </div>
//               </div>
//             )}
//           </section>

//           {/* Cart-based block */}
//           <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5 space-y-4">
//             <h3 className="text-sm font-semibold text-slate-100">
//               Cart-based conditions
//             </h3>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-1">
//                 <label className="block text-xs font-medium text-slate-300">
//                   Min cart value (optional)
//                 </label>
//                 <input
//                   type="number"
//                   {...register("minCartValue")}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                   placeholder="₹"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-xs font-medium text-slate-300">
//                   Min items count (optional)
//                 </label>
//                 <input
//                   type="number"
//                   {...register("minItemsCount")}
//                   className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
//                   placeholder="0"
//                 />
//               </div>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-1">
//                 <label className="block text-xs font-medium text-slate-300">
//                   Applicable categories (optional)
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {[
//                     { code: "ELECTRONICS", label: "ELECTRONICS" },
//                     { code: "FASHION", label: "FASHION" },
//                     { code: "GROCERY", label: "GROCERY" },
//                     { code: "HOME_APPLIANCES", label: "HOME APPLIANCES" },
//                   ].map((c) => (
//                     <label key={c.code} className={pillLabelClass}>
//                       <input
//                         type="checkbox"
//                         value={c.code}
//                         {...register("applicableCategories")}
//                         className={checkboxClass}
//                       />
//                       <span>{c.label}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-xs font-medium text-slate-300">
//                   Excluded categories (optional)
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {[
//                     { code: "ELECTRONICS", label: "ELECTRONICS" },
//                     { code: "FASHION", label: "FASHION" },
//                     { code: "GROCERY", label: "GROCERY" },
//                     { code: "HOME_APPLIANCES", label: "HOME APPLIANCES" },
//                   ].map((c) => (
//                     <label key={c.code} className={pillLabelClass}>
//                       <input
//                         type="checkbox"
//                         value={c.code}
//                         {...register("excludedCategories")}
//                         className={checkboxClass}
//                       />
//                       <span>{c.label}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-cyan-400 hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? "Creating..." : "Create Coupon"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
 import React from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateCoupon() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const discountType = watch("discountType");
  const selectedTiers = watch("allowedUserTiers") || [];
  const selectedCountries = watch("allowedCountries") || [];
  const firstOrderOnly = watch("firstOrderOnly");

  const ALL_TIERS = ["NEW", "REGULAR", "GOLD", "EVERYONE"];

  // Sync other tiers when "EVERYONE" toggles
  React.useEffect(() => {
    const tiers = watch("allowedUserTiers") || [];
    const asArray = Array.isArray(tiers) ? tiers : [tiers].filter(Boolean);
    const hasEveryone = asArray.includes("EVERYONE");

    if (hasEveryone) {
      // force all tiers selected
      if (ALL_TIERS.some((t) => !asArray.includes(t))) {
        setValue("allowedUserTiers", ALL_TIERS, { shouldValidate: true });
      }
    }
  }, [watch("allowedUserTiers"), setValue]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        code: formData.code,
        description: formData.description,
        discountType:
          formData.discountType === "percentage" ? "PERCENT" : "FLAT",
        discountValue: Number(formData.discountValue),
        maxDiscountAmount: formData.maxDiscountAmount
          ? Number(formData.maxDiscountAmount)
          : undefined,
        startDate: formData.startDate,
        endDate: formData.endDate,
        usageLimitPerUser: formData.usageLimitPerUser
          ? Number(formData.usageLimitPerUser)
          : undefined,
        User_based: {
          firstOrderOnly: !!formData.firstOrderOnly,
          minLifetimeSpend: formData.minLifetimeSpend
            ? Number(formData.minLifetimeSpend)
            : undefined,
          minOrdersPlaced: formData.minOrdersPlaced
            ? Number(formData.minOrdersPlaced)
            : undefined,
          allowedUserTiers: formData.allowedUserTiers,
          allowedCountries: formData.allowedCountries,
        },
        Cart_based: {
          minCartValue: formData.minCartValue
            ? Number(formData.minCartValue)
            : undefined,
          applicableCategories: formData.applicableCategories,
          excludedCategories: formData.excludedCategories
            ? formData.excludedCategories
            : [],
        },
        minItemsCount: formData.minItemsCount
          ? Number(formData.minItemsCount)
          : undefined,
      };

      const response = await apiConnector("POST", "/coupon/create", payload);
      console.log(response);
      toast.success(response.data?.message || "Coupon created successfully");
      navigate("/coupons");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create coupon"
      );
    }
  };

  // shared checkbox class
  const checkboxClass =
    "h-4 w-4 rounded-md border border-slate-500/80 bg-slate-900/80 " +
    "text-emerald-400 focus:ring-2 focus:ring-emerald-500/70 focus:ring-offset-0 " +
    "hover:border-emerald-400 transition-colors";

  const pillLabelClass =
    "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full " +
    "bg-slate-900/70 border border-slate-700 hover:border-emerald-500/60 " +
    "cursor-pointer text-xs text-slate-200 transition-colors";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl space-y-6 py-8 px-4 sm:px-8 bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Create New Coupon
            </h2>
            <p className="text-sm text-slate-300">
              Configure discount rules based on user profile and cart details.
            </p>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium uppercase tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Coupon builder
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic details */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-100">
              Basic information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  Coupon code
                </label>
                <input
                  type="text"
                  {...register("code", { required: "Coupon code is required" })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                  placeholder="FIRST100"
                />
                {errors.code && (
                  <p className="text-xs text-red-400">{errors.code.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  Discount type
                </label>
                <select
                  {...register("discountType", {
                    required: "Discount type is required",
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                >
                  <option value="">Select discount type</option>
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed amount</option>
                </select>
                {errors.discountType && (
                  <p className="text-xs text-red-400">
                    {errors.discountType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  Discount value
                </label>
                <input
                  type="number"
                  {...register("discountValue", {
                    required: "Discount value is required",
                    min: { value: 1, message: "Must be greater than 0" },
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                  placeholder={
                    discountType === "percentage" ? "e.g., 10 for 10%" : "e.g., 100"
                  }
                />
                {errors.discountValue && (
                  <p className="text-xs text-red-400">
                    {errors.discountValue.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  Max discount amount (optional)
                </label>
                <input
                  type="number"
                  {...register("maxDiscountAmount")}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                  placeholder="Optional cap"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-100">
                Description (optional)
              </label>
              <textarea
                {...register("description")}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                rows={2}
                placeholder="Short description of this coupon"
              ></textarea>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  Start date
                </label>
                <input
                  type="date"
                  {...register("startDate", { required: "Start date is required" })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                />
                {errors.startDate && (
                  <p className="text-xs text-red-400">{errors.startDate.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  End date
                </label>
                <input
                  type="date"
                  {...register("endDate", { required: "End date is required" })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                />
                {errors.endDate && (
                  <p className="text-xs text-red-400">{errors.endDate.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  Usage limit / user (optional)
                </label>
                <input
                  type="number"
                  {...register("usageLimitPerUser")}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                  placeholder="Optional"
                />
              </div>
            </div>
          </section>

          {/* User-based block */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-100">
              User-based conditions
            </h3>

            <label className="inline-flex items-center gap-2 text-sm text-slate-200">
              <input
                type="checkbox"
                {...register("firstOrderOnly")}
                className={checkboxClass}
              />
              <span>First order only</span>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* User tiers with EVERYONE */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Allowed user tiers (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_TIERS.map((tier) => (
                    <label key={tier} className={pillLabelClass}>
                      <input
                        type="checkbox"
                        value={tier}
                        {...register("allowedUserTiers")}
                        className={checkboxClass}
                      />
                      <span>{tier}</span>
                    </label>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  Selected:{" "}
                  {selectedTiers && selectedTiers.length > 0
                    ? (Array.isArray(selectedTiers)
                        ? selectedTiers
                        : [selectedTiers]
                      ).join(", ")
                    : "None"}
                </p>
              </div>

              {/* Countries */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Allowed countries (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: "IN", label: "India" },
                    { code: "USA", label: "United States" },
                    { code: "CA", label: "Canada" },
                    { code: "UK", label: "United Kingdom" },
                    { code: "AU", label: "Australia" },
                  ].map((c) => (
                    <label key={c.code} className={pillLabelClass}>
                      <input
                        type="checkbox"
                        value={c.code}
                        {...register("allowedCountries")}
                        className={checkboxClass}
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  Selected:{" "}
                  {selectedCountries && selectedCountries.length > 0
                    ? (Array.isArray(selectedCountries)
                        ? selectedCountries
                        : [selectedCountries]
                      ).join(", ")
                    : "None"}
                </p>
              </div>
            </div>

            {!firstOrderOnly && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-300">
                    Min lifetime spend (optional)
                  </label>
                  <input
                    type="number"
                    {...register("minLifetimeSpend")}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                    placeholder="₹"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-300">
                    Min orders placed (optional)
                  </label>
                  <input
                    type="number"
                    {...register("minOrdersPlaced")}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                    placeholder="0"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Cart-based block */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-100">
              Cart-based conditions
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Min cart value (optional)
                </label>
                <input
                  type="number"
                  {...register("minCartValue")}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                  placeholder="₹"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Min items count (optional)
                </label>
                <input
                  type="number"
                  {...register("minItemsCount")}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Applicable categories (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: "ELECTRONICS", label: "ELECTRONICS" },
                    { code: "FASHION", label: "FASHION" },
                    { code: "GROCERY", label: "GROCERY" },
                    { code: "HOME_APPLIANCES", label: "HOME APPLIANCES" },
                  ].map((c) => (
                    <label key={c.code} className={pillLabelClass}>
                      <input
                        type="checkbox"
                        value={c.code}
                        {...register("applicableCategories")}
                        className={checkboxClass}
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Excluded categories (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: "ELECTRONICS", label: "ELECTRONICS" },
                    { code: "FASHION", label: "FASHION" },
                    { code: "GROCERY", label: "GROCERY" },
                    { code: "HOME_APPLIANCES", label: "HOME APPLIANCES" },
                  ].map((c) => (
                    <label key={c.code} className={pillLabelClass}>
                      <input
                        type="checkbox"
                        value={c.code}
                        {...register("excludedCategories")}
                        className={checkboxClass}
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-cyan-400 hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Coupon"}
          </button>
        </form>
      </div>
    </div>
  );
}
