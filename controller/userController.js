const { registerUser, verifyOTP, resendOTP, loginUser, verifyLoginOtp } = require('../services/otpServices');

const userRegister = async (req, res) => {
    try {
        const { email, name } = req.body;

        const response = await registerUser(name, email);

        if (response.message === 'Email already taken') {
            return res.status(400).json({ message: 'Email already taken' });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};


const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        
        const response = await verifyOTP(userId, otp);

        if (response.message === 'expired otp') {
            return res.status(400).json({ message: 'OTP expired. Please request a new OTP.' });
        }

        if (response.message === 'invalid otp') {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'OTP verification failed', error });
    }
};


const resendOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const response = await resendOTP(userId);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Failed to resend OTP', error });
    }
};


const userLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await loginUser( email);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'unable to generate otp', error });
    }
};

const userLoginVerification = async (req, res) => {
    try {
        const { userId,otp } = req.body;
        const response = await verifyLoginOtp(userId, otp);

        if (response.message === 'expired otp') {
            return res.status(400).json({ message: 'OTP expired. Please request a new OTP.' });
        }

        if (response.message === 'invalid otp') {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        res.status(201).json(response);

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'unable to generate otp', error });
    }
};



module.exports = {
    userRegister,
    verifyOtp,
    resendOtp,
    userLogin,
    userLoginVerification
};
