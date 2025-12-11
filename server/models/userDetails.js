const mongoose = require('mongoose');
const userDetails = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    User_Context: {
        userTier: {
            type: String,
            enum: ["NEW", "REGULAR", "GOLD"],
            required: true
        },
        country: {
            type: String,
            required: true
        },
        lifetimeSpend: {
            type: Number,
            required: true
        },
        ordersPlaced: {
            type: Number,
            required: true
        },
        couponsUsed: [{
            couponCode: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }]
    },
        Cart_Context: {
            items: [{
                name: {
                    type: String,
                    required: true
                },
                category: {
                    type: String,
                    enum: ["ELECTRONICS", "FASHION", "GROCERY", "HOME_APPLIANCES"],
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
            ],
            totalAmount: {
                type: Number,
                required: true
            }
        }
    
});

module.exports = mongoose.model('UserDetails', userDetails);