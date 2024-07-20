const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // adjust the path as needed
const { generateToken } = require('../utils/jwt');

// Register a new user
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ username, password: hashedPassword });
        const token = generateToken(user._id);
        res.status(201).json({ status: 'success', token, data: { user } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect username or password' });
        }
        const token = generateToken(user._id);
        res.status(200).json({ status: 'success', token, data: { user } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
