// utils/emailSender.js
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // or your email provider
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});


export async function sendEmail(email: string, verificationCode: string | number) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${verificationCode}`,
        html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email Sent Successfully")
    } catch (error) {
        console.error(`Error sending the email: `, error)
    }

}