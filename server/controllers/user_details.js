const Coupon = require('../models/Coupon');
const userDetails = require('../models/userDetails');
const User = require('../models/user');
const Product = require('../models/Product');

exports.create_User_Details = async (req, res) => {
    try {
        const {
            User_Context: {
                userTier,
                country,
                lifetimeSpend,
                ordersPlaced,
                couponsUsed,
            }
        } = req.body;
        console.log("req.body", req.body)
        const { userId } = req.params;
        const newUserDetails = new userDetails({
            userId,
            User_Context: {
                userTier,
                country,
                lifetimeSpend,
                ordersPlaced,
                couponsUsed,
            }
        });
        await newUserDetails.save();
        res.status(201).json({ message: 'User details created successfully', userDetails: newUserDetails });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to create user details', error: error.message });
    }
};

exports.get_best_coupon = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (user === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userDetailsData = await userDetails.findOne({ userId: user._id });
        if (userDetailsData === null) {
            return res.status(404).json({ message: 'User details not found' });
        }
        const products = await Product.findOne({ userId: user._id });
        if (products === null) {
            return res.status(404).json({ message: 'Products not found for user' });
        }
        const coupons = await Coupon.find();
        const now = new Date();
        let bestCoupon = null;
        let bestDiscount = 0;
        for (const coupon of coupons) {
            console.log("coupon code", coupon.code)
            // Check validity period
            if (now <= coupon.startDate || now >= coupon.endDate) continue;
            console.log("after date check");
            //check the code is for first time user only
            if (coupon.User_based.firstOrderOnly) {
                console.log("fist order only check");
                if (userDetailsData.User_Context.ordersPlaced > 0) continue;
            }
            console.log("fist order only check pass");
            console.log("coupon", coupon)
            console.log("usageLimitPerUser", coupon.usageLimitPerUser)
            // check code usage Limit Per User
            const codelimit = coupon.usageLimitPerUser;
            const usedCoupon = userDetailsData.User_Context.couponsUsed.find(c => c.couponCode === coupon.code);
            const usedCount = usedCoupon ? usedCoupon.count : 0;
            console.log("usedCount", usedCount);
            console.log("codelimit", codelimit);
            if (codelimit && usedCount >= codelimit) continue;
            console.log("usage Limit Per User pass");
            // Check User_based criteria
            const ub = coupon.User_based;
            if (ub.allowedUserTiers && !ub.allowedUserTiers.includes(userDetailsData.User_Context.userTier)) continue;
            console.log("allowedUserTiers check");
            if (ub.minLifetimeSpend && userDetailsData.User_Context.lifetimeSpend < ub.minLifetimeSpend) continue;
            console.log("minLifetimeSpend check");
            if (ub.minOrdersPlaced && userDetailsData.User_Context.ordersPlaced < ub.minOrdersPlaced) continue;
            console.log("minOrdersPlaced check");
            if (ub.allowedCountries && !ub.allowedCountries.includes(userDetailsData.User_Context.country)) continue;
            console.log("allowedCountries check");

            console.log("User_based criteria");

            //cart based criteria
            const cb = coupon.Cart_based;
            // const cart = products;
            if (cb.minCartValue && products.totalAmount < cb.minCartValue) continue;
            console.log("minCartValue check");

            if (cb.applicableCategories) {
                console.log("applicableCategories check");
                const hasApplicableCategory = products.items.some(item => cb.applicableCategories.includes(item.category));
                if (!hasApplicableCategory) continue;
                console.log("applicableCategories check pass");
            }
            if (cb.excludedCategories) {
                console.log("excludedCategories check");
                const hasExcludedCategory = products.items.some(item => cb.excludedCategories.includes(item.category));
                if (hasExcludedCategory) continue;
                console.log("excludedCategories check pass");
            }
            console.log("minItemsCount", coupon.minItemsCount)
            console.log("items length", products.items.length)
            // console.log("minItemsCount",minItemsCount)
            // console.log("minItemsCount",minItemsCount)
            if (coupon.minItemsCount &&  products.length < coupon.minItemsCount) continue;
            console.log("minItemsCount check");

            console.log("******* all check passed ******")
            // Compute discount
            let discount = 0;

            console.log("coupon discountType", coupon.discountValue)
            if (coupon.discountType === 'FLAT') {
                discount = coupon.discountValue;

            }
            else if (coupon.discountType === 'PERCENT') {
                discount = (coupon.discountValue / 100) * products.totalAmount;
                if (coupon.maxDiscountAmount) {
                    discount = Math.min(discount, coupon.maxDiscountAmount);
                }
            }

            // Select best coupon
            if (discount > bestDiscount ||
                (discount === bestDiscount && (!bestCoupon || coupon.endDate < bestCoupon.endDate)) ||
                (discount === bestDiscount && bestCoupon && coupon.code < bestCoupon.code)
            ) {
                bestDiscount = discount;
                bestCoupon = coupon;
            }
            console.log("bestCoupon so far", bestCoupon);
            console.log("bestDiscount so far", bestDiscount);
        }
        if (bestCoupon) {
            console.log("Final bestCoupon", bestCoupon);
            console.log("Final bestDiscount", bestDiscount);
            res.status(200).json({message:"successfully find best coupon", bestCoupon: bestCoupon.code, discount: bestDiscount });
        } else {
            console.log("No applicable coupon found");
            res.status(200).json({ message: 'No applicable coupon found', bestCoupon: null, discount: 0 });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving best coupon', error: error.message });
    }
};


