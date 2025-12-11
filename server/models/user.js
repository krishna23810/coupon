const mongoose = require('mongoose');

const User = new mongoose.Schema({
    Password : {
        type: String,
        required: true
    },
    Email : {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = mongoose.model('User', User);
