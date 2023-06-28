const nodemailer = require('nodemailer')
const fs = require('fs')

const sendEmailConfirmation = (sender,receiver) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user:process.env.EMAIL,
            pass: process.env.EMAILPASS
        }
    })
    let mailOptions = {
        from: sender,
        to: receiver,
        subject: 'Welcome',
        text: 'welcome to chirp',
        html: ''
    }
    let readStream = fs.createReadStream('../public/welcome.html', 'utf8');
    readStream.on('data', function(chunk) {
        mailOptions.html += chunk;
    });
    transporter.sendMail(mailOptions,(error,info) => {
        if (error){
            return error
        }
        console.log(`message sent ${info.messageId}`)
    })
}

module.exports = {sendEmailConfirmation}