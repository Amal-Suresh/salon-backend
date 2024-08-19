const { checkIfUserExists, generateOTP, saveUserTemporary, getUserTemporary, removeUserTemporary } = require('./userServices');
const { sendOTPEmail } = require('../utils/emailService');
const User = require('../models/User');

const registerUser = async (name, email) => {
    const existingUser = await checkIfUserExists(email);

    if (existingUser) {
        return { message: 'Email already taken' };
    }

    const otp = generateOTP();
    const userId = saveUserTemporary(name, email, otp);

    await sendOTPEmail(email, otp);
    return { message: 'OTP sent', userId };
};

const verifyOTP = async (userId, otp) => {
    const tempUserData = getUserTemporary(userId);

    if (!tempUserData) {
        return { message: 'invalid input' };
    }

    const { name, email, otp: storedOTP, otpTimestamp } = tempUserData;
    const isOTPValid = storedOTP === parseInt(otp);
    const isOTPExpired = (Date.now() - otpTimestamp) > 10 * 60 * 1000; 

    if (isOTPExpired) {
        return { message: 'expired otp' };
    }

    if (!isOTPValid) {
        return { message: 'invalid otp' };
    }

  
    const newUser = new User({
        name,
        email,
    });

    await newUser.save();

    removeUserTemporary(userId);

    return { message: 'User created', user: newUser };
};


const resendOTP = async (userId) => {
    
    const tempUserData = getUserTemporary(userId);

    if (!tempUserData) {
        throw new Error('Invalid request');
    }

    const { email } = tempUserData;
    const newOtp = generateOTP();
    const otpTimestamp = Date.now();

    tempUserData.otp = newOtp;
    tempUserData.otpTimestamp = otpTimestamp;
    tempUserMap.set(userId, tempUserData);

  
    await sendOTPEmail(email, newOtp);

    return { message: 'OTP resented successfully' };
};

module.exports={
    registerUser,
    verifyOTP,
    resendOTP
}
