const { verifyToken } = require('../utils/jwt');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'You are not logged in! Please log in to get access.' });
    }

    try {
        const decoded = verifyToken(token);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ status: 'fail', message: 'The user belonging to this token no longer exists.' });
        }
        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({ status: 'fail', message: 'Invalid token!' });
    }
};

module.exports = protect;
