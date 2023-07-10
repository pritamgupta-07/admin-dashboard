import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

 export async function handleSendMail(email, subject, htmlTemplate ){
    try{
        
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL ,
                pass: process.env.USER_EMAIL_PASSWORD,
              },
        })
    
        const mailOptions = {
            from: 'uniqueracer2003gmail.com',
            to: email,
            subject: subject,
            html: htmlTemplate,
          };
          
           const info = await transporter.sendMail(mailOptions)
           
           return info
    }catch(error){  
        console.error('Error sending email:', error);
    }
       
}
