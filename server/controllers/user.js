const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const { Password, Email } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        const newUser = new User({ Password, Email });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        return res.status(500).json({ message: 'Unable to create user', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        if (user?.Password !== Password) {
            return res.status(401).json({status: false, message: 'Invalid password' });
        }
        res.status(200).json({ status: true, message: 'User logged in successfully', user });
    } catch (error) {
        res.status(500).json({status: false, message: 'Unable to login user', error: error.message });
    }
};
