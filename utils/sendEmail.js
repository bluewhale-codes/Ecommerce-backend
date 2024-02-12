const nodeMailer = require("nodemailer");

const sendEmail = async (options)=>{
     
    const transporter = nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:"vishalshakya2255@gmail.com",
            pass:"gexgmopxmydanove"
        }
    })
    const mailOptions = {
        from:"vishalshakya2255@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions)
    console.log('email send')
}

module.exports = sendEmail;