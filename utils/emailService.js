const nodemailer = require('nodemailer');

exports.sendOTPEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP for registration',
        text: `Your OTP is ${otp}`,
    };

    return transporter.sendMail(mailOptions);
};
