const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();

router.post('/send-email', async (req, res) => {
    const { host, smptPort, smptUser, password, fromName, reciever, subject, message } = req.body;
    contentHTML = `
        <h1>Mensaje</h1>
        <p>${message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: host,
        port: smptPort,
        secure: false,
        auth: {
            user: smptUser,
            pass: password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    console.log(transporter)

    let info = await transporter.sendMail({
        from: `"${fromName}" <${smptUser}>`, // sender address,
        to: reciever,
        subject: subject,
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/success.html');
});

module.exports = router;