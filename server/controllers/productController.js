const express = require('express');

const Product = require('../models/product');

exports.createProduct = async (req, res) => {

    try {
        const { items , totalAmount } = req.body;
        const { userId } = req.params;
        const newProduct = new Product({
            userId,
            items,
            totalAmount
        });
        
        const user = await Product.findOne({ userId: userId });
        if (user) {
            // If user exists, you might want to update their products instead
            user.items.push(...items);
            // Recalculate totalAmount if needed
            user.totalAmount += totalAmount;
            await user.save();
            return res.status(200).json({ message: 'Product updated successfully', product: user });
        }
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    }   
    catch (error) {
        res.status(500).json({ message: 'Unable to create product', error: error.message });
    }

}
// Get all products

exports.getAllProducts = async (req, res) => {
    try {
        const { userId } = req.params;
        const products = await Product.find({ userId: userId });
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch products', error: error.message });
    }
}
