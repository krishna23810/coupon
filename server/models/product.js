const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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

});

module.exports = mongoose.model('Product', productSchema);