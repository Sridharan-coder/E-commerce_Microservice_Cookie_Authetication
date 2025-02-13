const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sridharan.r@mitrahsoft.com",
        pass: "yaoc roqr wcoe hiex",
    },
});

const SendingTheMail = (req, res) => {
    
    const { email} = req.body;

    const otp=Math.floor(Math.random()*1000000)

    const mailOptions = {
        from: "sridharan.r@mitrahsoft.com",
        to: email,
        subject: "Otp verification for E-commerce website",
        text: `Otp: ${otp} has been recieved`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Error sending email");
        }
        console.log("Email sent:", info.response);
        res.status(200).json({msg:"Email sent successfully",otp});
    });
}

module.exports = { SendingTheMail }