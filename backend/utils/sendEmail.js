import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    //Create email transporter
    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : 587,
        secure : false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls:{
            rejectUnauthorized:false
        }
    })
   
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    //Send email
    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err)
        } else {
            console.log(info)
        }
    })


    };

export default sendEmail;

