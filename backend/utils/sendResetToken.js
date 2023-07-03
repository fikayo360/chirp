const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

function generateToken(email, expiresIn) {
    const secretKey = process.env.JWT_SECRET; 
    const token = jwt.sign({ email }, secretKey, { expiresIn });
    return token;
 }

 const sendResetToken = (email) => {
    let tokenData = generateToken(email,process.env.JWT_LIFETIME)
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user:process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'password reset',
        text: `pls copy this token and use to reset your password ${tokenData}`
    }

   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.log('Error sending email:', error);
    } else {
    console.log('Email sent:', info.response);
    founduser.resettoken = tokenData
    founduser.save()
    }
});
}

module.exports = {sendResetToken}