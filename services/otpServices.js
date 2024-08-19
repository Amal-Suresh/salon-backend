const { checkIfUserExists, generateOTP, saveUserTemporary, getUserTemporary, removeUserTemporary, tempUserMap } = require('./userServices');
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
        return { message: 'email not found resubmit email' };
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


const loginUser = async ( email) => {
    const existingUser = await checkIfUserExists(email);

    if (existingUser) {
        const otp = generateOTP();
        const userId = saveUserTemporary(existingUser.name, email, otp);
    
        await sendOTPEmail(email, otp);
        return { message: 'OTP sent', userId };
       
    }
    return { message: 'Email not registered' };

   
};

const verifyLoginOtp = async (userId, otp) => {
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

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return { message: 'User not found' };
        }

        const token = createToken(user);
        removeUserTemporary(userId);

        return { message: 'Login successful', name: user.name, token };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { message: 'Server error' };
    }
};


module.exports={
    registerUser,
    verifyOTP,
    resendOTP,
    loginUser,
    verifyLoginOtp
}
