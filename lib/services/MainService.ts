import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maximillia23@ethereal.email',
        pass: 'jGDD4Ggm8hDksMsHc4'
    }
});


export const SendEmail = async(name:string,email:string,token:string)=>{
    const info = await transporter.sendMail({
    from: 'krishna@krishna.com', // sender address
    to: email, // list of receivers
    subject: "forget password", // Subject line
    // text: "Hello world?", // plain text body
    html: `
    
                hey,${name},
                click here
                
                <a href="http://localhost:3000/update-password?token=${token}">click here to update</a>
    `, // html body
  });
}