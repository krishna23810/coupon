const express = require('express');
const Coupon = require('../models/Coupon');
const userDetails = require('../models/userDetails');
const Product = require('../models/product');

exports.createCoupon = async (req, res) => {
    try {
        const {
            code,
            description,
            discountType,
            discountValue,
            maxDiscountAmount,
            startDate,
            endDate,
            usageLimitPerUser,
            User_based,
            Cart_based,
            minItemsCount
        } = req.body;

        const newCoupon = new Coupon({
            code,
            description,
            discountType,
            discountValue,
            maxDiscountAmount,
            startDate,
            endDate,
            usageLimitPerUser,
            User_based,
            Cart_based,
            minItemsCount
        });
        await newCoupon.save();
        res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to create coupon', error: error.message });
    }

};

// get all coupons

exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'unable to get all coupons', error: error.message });

    }
};


// add the coupon to user used coupons list

exports.addCouponToUser = async (req, res) => {
    try {
        const { userId , couponCode } = req.params;
        const coupon = await Coupon.findOne({ code: couponCode });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        const userDetailsData = await userDetails.findOne({ userId: userId });
        if (!userDetailsData) {
            return res.status(404).json({ message: 'User details not found' });
        }
        if(userDetailsData.User_Context.couponsUsed.some(c => c.couponCode === coupon.code)) {
            // If coupon already used, increment the count
            const usedCoupon = userDetailsData.User_Context.couponsUsed.find(c => c.couponCode === coupon.code);
            usedCoupon.count += 1;
        } else {
            // If coupon not used before, add it to the list
            userDetailsData.User_Context.couponsUsed.push({ couponCode: coupon.code, count: 1 });
            // increment ordersPlaced
        }
        userDetailsData.User_Context.ordersPlaced += 1;
        const products = await Product.findOne({ userId: userId });
        console.log('Products for user:', products.totalAmount);
        if (products) {
            // calculate total amount from products
            const totalAmount = products.totalAmount || 0;
            userDetailsData.User_Context.lifetimeSpend += totalAmount;
        }
        await userDetailsData.save();
        //delete products after order is placed
        await Product.deleteMany({ userId: userId });

        res.status(200).json({ message: 'Coupon added to user used coupons', userDetails: userDetailsData });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to add coupon to user', error: error.message });
    }
};
