require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using your email provider’s SMTP settings
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Or another email service provider
        auth: {
            user: 'absingh7465@gmail.com', // Replace with your email
            pass: 'Ssdn@2074', // Replace with your email password
        },
    });

    // Email options
    let mailOptions = {
        from: email, // The email entered in the form
        to: 'absingh7465@gmail.com', // The email where you want to receive submissions
        subject: 'New Form Submission',
        text: `You have a new submission from:
        Name: ${name}
        Email: ${email}
        Message: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent successfully!');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
