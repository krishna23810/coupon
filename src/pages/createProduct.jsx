import React from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function createProduct() {
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const navigate = useNavigate();

    const createNewProduct = async (data) => {
        try {
            const user = localStorage.getItem("user");
            const userId = JSON.parse(user).user._id;
            console.log("User ID:", userId);

            const items = [
                {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    quantity: parseInt(data.quantity)
                }
            ];

            const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            const response = await apiConnector('POST', `/product/create/${userId}`, {
                items,
                totalAmount
            });
            console.log("Product creation successful:", response.data);
            toast.success("Product created successfully");
            navigate("/deashboard");
        }
        catch (error) {
            console.error("Product creation failed:", error);
            toast.error("Failed to create product");
        }
    }
    const onSubmit = (data) => {
        createNewProduct(data);
        // console.log("Form Data:", data);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-2xl space-y-8 py-10 px-6 sm:px-10 bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Create New Product
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300">
                        Add products to the cart with items and total amount.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-100">
                            Name of Item
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Name of item is required",
                            })}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-400">
                                {String(errors.name.message)}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-100">
                            Category
                        </label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 pr-9 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
                            defaultValue="ELECTRONICS"
                        >
                            <option value="ELECTRONICS">ELECTRONICS</option>
                            <option value="FASHION">FASHION</option>
                            <option value="GROCERY">GROCERY</option>
                            <option value="HOME_APPLIANCES">HOME_APPLIANCES</option>
                        </select>
                        {errors.category && (
                            <p className="text-xs text-red-400">
                                {String(errors.category.message)}
                            </p>
                        )}
                    </div>


                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-100">
                            Price
                        </label>
                        <input
                            type="number"
                            {...register("price", {
                                required: "Price is required",
                            })}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
                        />
                        {errors.price && (
                            <p className="text-xs text-red-400">
                                {String(errors.price.message)}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-100">
                            Quantity
                        </label>
                        <input
                            type="number"

                            {...register("quantity", {
                                required: "Quantity is required",
                            })}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
                        />
                        {errors.quantity && (
                            <p className="text-xs text-red-400">
                                {String(errors.quantity.message)}
                            </p>
                        )}
                    </div>

                    <button

                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-cyan-400 hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Creating Product..." : "Create Product"}
                    </button>

                </form>
            </div>
        </div>
    );
}