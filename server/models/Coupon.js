const mongoose = require('mongoose');

const Coupon = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    discountType: {
        type: String,
        enum: ['FLAT', 'PERCENT'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    maxDiscountAmount: {
        type: Number,
        required: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    usageLimitPerUser: {
        type: Number,
        required: false
    },

    User_based: {
        allowedUserTiers: {
            type: [String],
            enum: ["NEW", "REGULAR", "GOLD"],
            required: false
        },
        minLifetimeSpend: {
            type: Number,
            required: false
        },
        minOrdersPlaced: {
            type: Number,
            required: false
        },
        firstOrderOnly: {
            type: Boolean,
            required: false
        },
        allowedCountries: {
            type: [String],
            required: false
        }
    },
    Cart_based: {
        minCartValue: {
            type: Number,
            required: false
        },
        applicableCategories: {
            type: [String],
            enum: ["ELECTRONICS", "FASHION", "GROCERY", "HOME_APPLIANCES"],
            required: false
        },
        excludedCategories: {
            type: [String],
            enum: ["ELECTRONICS", "FASHION", "GROCERY", "HOME_APPLIANCES"],
            required: false
        }
    },
    minItemsCount: {
        type: Number,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', Coupon);