const express = require('express');
const Coupon = require('../models/Coupon');

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