const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
exports.sendOTPEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.EMAIL ,
            pass:process.env.PASS ,
        },
    });

    const mailOptions = {
        from:process.env.EMAIL,
        to: email,
        subject: 'Your OTP for registration',
        text: `Your OTP is ${otp}`,
    };

    return transporter.sendMail(mailOptions);
};
