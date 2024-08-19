const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const createToken = (user) => {
    const payload = {
        id: user._id,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '2d' });
    return token;
};

module.exports = { createToken };