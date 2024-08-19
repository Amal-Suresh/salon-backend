const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');


const tempUserMap = new Map();

const checkIfUserExists = async (email) => {
    return await User.findOne({ email });
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const saveUserTemporary = (name, email, otp) => {
    const otpTimestamp = Date.now();
    const userId = uuidv4();
    tempUserMap.set(userId, { name, email, otp, otpTimestamp });
    return userId;
};

const getUserTemporary = (userId) => {
    return tempUserMap.get(userId);
};

const removeUserTemporary = (userId) => {
    tempUserMap.delete(userId);
};

module.exports = {
    checkIfUserExists,
    generateOTP,
    saveUserTemporary,
    getUserTemporary,
    removeUserTemporary,
    tempUserMap
}
