import React, { useEffect, useState } from "react";
import { apiConnector } from "../service";
import { toast } from "react-hot-toast";

export default function ViewCouponCodes() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoupons = async () => {
    try {
      const response = await apiConnector("GET", "/coupon/all");
      setCoupons(response.data || []);
      console.log(response.data);
      toast.success("Fetched coupon codes successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch coupon codes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const now = new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-6xl space-y-6 py-8 px-4 sm:px-8 bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Coupon Codes
            </h1>
            <p className="text-sm text-slate-300">
              Review all configured coupons, discounts, and eligibility rules.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300">
              Total coupons:{" "}
              <span className="font-semibold text-slate-50">
                {coupons.length}
              </span>
            </span>
          </div>
        </header>

        {/* Content */}
        {loading ? (
          <p className="text-center text-slate-300 text-sm">Loading coupons...</p>
        ) : coupons.length === 0 ? (
          <p className="text-center text-slate-400 text-sm">
            No coupons created yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-900/90">
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    Details
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    Type & Value
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    Validity
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    User rules
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    Cart rules
                  </th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c, idx) => {
                  const ub = c.User_based || {};
                  const cb = c.Cart_based || {};
                  const start = new Date(c.startDate);
                  const end = new Date(c.endDate);
                  const isActive = now >= start && now <= end;

                  return (
                    <tr
                      key={c._id || idx}
                      className="border-t border-slate-800 hover:bg-slate-900/70 transition-colors"
                    >
                      {/* Code + status */}
                      <td className="px-4 py-4 align-top">
                        <div className="flex flex-col gap-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold">
                            {c.code}
                          </span>
                          <span
                            className={`inline-flex w-fit items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${
                              isActive
                                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                                : "bg-slate-700/30 text-slate-300 border border-slate-600/60"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {isActive ? "Active" : "Expired / Upcoming"}
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-4 py-4 align-top">
                        <p className="text-slate-100 text-xs sm:text-sm">
                          {c.description || "No description"}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500">
                          ID:{" "}
                          <span className="font-mono text-slate-400">
                            {c._id}
                          </span>
                        </p>
                      </td>

                      {/* Type / Value */}
                      <td className="px-4 py-4 align-top">
                        <p className="text-xs font-semibold text-slate-100">
                          {c.discountType === "PERCENT" ? "Percentage" : "Flat"}
                        </p>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {c.discountType === "PERCENT"
                            ? `${c.discountValue}%`
                            : `₹${c.discountValue}`}
                        </p>
                        {c.maxDiscountAmount && (
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Max discount: ₹{c.maxDiscountAmount}
                          </p>
                        )}
                        {c.usageLimitPerUser && (
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Limit / user: {c.usageLimitPerUser}
                          </p>
                        )}
                      </td>

                      {/* Validity */}
                      <td className="px-4 py-4 align-top text-xs text-slate-300">
                        <p>
                          From:{" "}
                          <span className="text-slate-100">
                            {start.toLocaleDateString("en-IN")}
                          </span>
                        </p>
                        <p className="mt-0.5">
                          To:{" "}
                          <span className="text-slate-100">
                            {end.toLocaleDateString("en-IN")}
                          </span>
                        </p>
                        {c.minItemsCount && (
                          <p className="mt-1 text-[11px] text-slate-400">
                            Min items overall: {c.minItemsCount}
                          </p>
                        )}
                      </td>

                      {/* User rules */}
                      <td className="px-4 py-4 align-top text-xs text-slate-300">
                        <div className="space-y-1.5 max-w-[200px]">
                          {ub.firstOrderOnly && (
                            <p className="text-emerald-300 font-medium">
                              • First order only
                            </p>
                          )}
                          {ub.minLifetimeSpend && (
                            <p>• Min lifetime spend: ₹{ub.minLifetimeSpend}</p>
                          )}
                          {ub.minOrdersPlaced && (
                            <p>• Min orders: {ub.minOrdersPlaced}</p>
                          )}
                          {ub.allowedUserTiers &&
                            ub.allowedUserTiers.length > 0 && (
                              <p>
                                • Tiers:{" "}
                                <span className="text-slate-200">
                                  {ub.allowedUserTiers.join(", ")}
                                </span>
                              </p>
                            )}
                          {ub.allowedCountries &&
                            ub.allowedCountries.length > 0 && (
                              <p>
                                • Countries:{" "}
                                <span className="text-slate-200">
                                  {ub.allowedCountries.join(", ")}
                                </span>
                              </p>
                            )}
                          {!ub.firstOrderOnly &&
                            !ub.minLifetimeSpend &&
                            !ub.minOrdersPlaced &&
                            !ub.allowedUserTiers &&
                            !ub.allowedCountries && (
                              <p className="text-slate-500">
                                No user-specific rules
                              </p>
                            )}
                        </div>
                      </td>

                      {/* Cart rules */}
                      <td className="px-4 py-4 align-top text-xs text-slate-300">
                        <div className="space-y-1.5 max-w-[220px]">
                          {cb.minCartValue && (
                            <p>• Min cart value: ₹{cb.minCartValue}</p>
                          )}
                          {c.minItemsCount && (
                            <p>• Min items in cart: {c.minItemsCount}</p>
                          )}
                          {cb.applicableCategories &&
                            cb.applicableCategories.length > 0 && (
                              <p>
                                • Include categories:{" "}
                                <span className="text-slate-200">
                                  {cb.applicableCategories.join(", ")}
                                </span>
                              </p>
                            )}
                          {cb.excludedCategories &&
                            cb.excludedCategories.length > 0 && (
                              <p>
                                • Exclude categories:{" "}
                                <span className="text-slate-200">
                                  {cb.excludedCategories.join(", ")}
                                </span>
                              </p>
                            )}
                          {!cb.minCartValue &&
                            !c.minItemsCount &&
                            !cb.applicableCategories &&
                            !cb.excludedCategories && (
                              <p className="text-slate-500">
                                No cart-specific rules
                              </p>
                            )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
