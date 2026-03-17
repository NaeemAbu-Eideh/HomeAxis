const User = require('../models/user.model');

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // ما يرجع الباسورد
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const findUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const userData = user.toObject();
        delete userData.password; // ما نرجع الباسورد
        res.status(201).json(userData);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors });
        } else if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
}

const editUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true, context: 'query' }
        ).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ error: err.message });
    }
}

module.exports = { findAllUsers, findUserById, findUserByEmail, deleteUser, addUser, editUser };