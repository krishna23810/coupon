import React, { useEffect, useState } from "react";
import { apiConnector } from "../service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ViewCartProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bestCoupon, setBestCoupon] = useState(null);
    // bestCoupon will later be like: { code: string, discount: number }

    const getAllProducts = async () => {
        try {
            const user = localStorage.getItem("user");
            const userId = user ? JSON.parse(user).user._id : null;

            if (!userId) {
                toast.error("User not found in localStorage");
                setLoading(false);
                return;
            }

            const response = await apiConnector("GET", `/product/getAll/${userId}`);
            const data = response.data.products || response.data;
            setProducts(data);
            console.log("Fetched products:", data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const cart = products[0] || {};
    const items = cart.items || [];
    const totalAmount = cart.totalAmount || 0;
    const finalPayable = bestCoupon
        ? Math.max(totalAmount - bestCoupon.discount, 0)
        : totalAmount;


    const handleApplyBestCoupon = async () => {
        try {
            const user = localStorage.getItem("user");
            const userId = user ? JSON.parse(user).user._id : null;

            if (!userId) {
                toast.error("User not found in localStorage");
                return;
            }

            const response = await apiConnector(
                "GET",
                `/coupon/best-coupon/${userId}`
            );
            console.log("Best coupon response:", response.data);

            const { bestCoupon, discount } = response.data || {};

            if (bestCoupon && discount > 0) {
                setBestCoupon({ code: bestCoupon, discount });
                toast.success(
                    `Best coupon applied: ${bestCoupon} for a discount of ₹${discount.toLocaleString()}`
                );
            } else {
                setBestCoupon(null);
                toast.error("No applicable coupon found");
            }
        } catch (error) {
            console.error("Failed to apply best coupon:", error);
            toast.error("Failed to apply best coupon");
        }
    };


    const heandleaddCoupontoUser = async () => {
        try {
            const user = localStorage.getItem("user");
            const userId = user ? JSON.parse(user).user._id : null;
            const couponCode = bestCoupon.code;
            if (!userId) {
                toast.error("User not found in localStorage");
                return;
            }
            const response = await apiConnector("POST",`/coupon/add-to-user/${userId}/${couponCode}`
            );
            console.log("Add coupon to user response:", response.data);
            toast.success(`Coupon ${couponCode} added to your used coupons list`);
            navigate("/deashboard");
        } catch (error) {
            console.error("Failed to add coupon to user:", error);
            toast.error("Failed to add coupon to user");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-4xl space-y-6 py-8 px-4 sm:px-8 bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl">
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Cart Products
                        </h1>
                        <p className="text-sm text-slate-300">
                            Review all items currently in your cart.
                        </p>
                    </div>
                    {cart.userId && (
                        <span className="text-xs text-slate-400">
                            User ID: <span className="font-mono">{cart.userId}</span>
                        </span>
                    )}
                </header>

                {loading ? (
                    <p className="text-center text-slate-300 text-sm">
                        Loading products...
                    </p>
                ) : items.length === 0 ? (
                    <p className="text-center text-slate-400 text-sm">
                        No products found in your cart.
                    </p>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-900/80">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-300">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-300">
                                            Category
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold text-slate-300">
                                            Price
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold text-slate-300">
                                            Qty
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold text-slate-300">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => {
                                        const subtotal = item.price * item.quantity;
                                        return (
                                            <tr
                                                key={item._id}
                                                className="border-t border-slate-800 hover:bg-slate-900/60"
                                            >
                                                <td className="px-4 py-3">{item.name}</td>
                                                <td className="px-4 py-3 text-slate-300">
                                                    {item.category}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    ₹{item.price.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-4 py-3 text-right font-semibold">
                                                    ₹{subtotal.toLocaleString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary + coupon area */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-300">
                                    Items in cart:{" "}
                                    <span className="font-semibold">{items.length}</span>
                                </p>
                                <p className="text-sm text-slate-300">
                                    Cart total:{" "}
                                    <span className="font-semibold">
                                        ₹{totalAmount.toLocaleString()}
                                    </span>
                                </p>

                                {bestCoupon && (
                                    <div className="mt-2 rounded-xl border border-emerald-600 bg-emerald-500/10 px-3 py-2 text-sm">
                                        <p className="font-semibold text-emerald-300">
                                            Applied coupon: {bestCoupon.code}
                                        </p>
                                        <p className="text-emerald-200">
                                            Discount: ₹{bestCoupon.discount.toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 md:text-right">
                                <p className="text-lg sm:text-xl font-semibold">
                                    Payable amount:{" "}
                                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                        ₹{finalPayable.toLocaleString()}
                                    </span>
                                </p>

                                {!bestCoupon ? (

                                    <button
                                        onClick={handleApplyBestCoupon}
                                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full 
                             bg-emerald-600 text-sm font-semibold text-black
                             shadow-sm hover:bg-emerald-500 
                             focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                                    >
                                        Find Best Coupon
                                    </button>
                                ) :  (
                                <button
                                        onClick={heandleaddCoupontoUser}
                                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full 
                             bg-emerald-600 text-sm font-semibold text-black
                             shadow-sm hover:bg-emerald-500 
                             focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                                    >
                                        Apply Best Coupon
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
