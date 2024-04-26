const nodemailer = require('nodemailer');
function 
const transporter = nodemailer.createTransport({
    service:'gamil',
    auth: {
        user: 'youremail@gmail.com',
        pass: 'your password'
    }
});

let mailOptions = {
    from: 'youremail@gmail.com',
    to: 'youremail@gmail.com',
    subject: 'Sending email through SINTETIK',
    text: 'That was Easy'
};

transporter.sendMail(mailOptions, (err,info)=>{
    if(err) throw err;
    console.log('Email sent: ' + info.response)
})