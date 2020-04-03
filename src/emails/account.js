const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rosariodaren9@gmail.com',
        subject: 'Welcome to task manager',
        text: `Welcome to the app, ${name}. let me know how you get along with the app`,
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rosariodaren9@gmail.com',
        subject: 'Cancellation Account',
        text: `hey! ${name}, sorry to see you go. the task manager team hope to see you back soon.
        
        the task manager team want to now why did you canceled your account, please help us to be better with your feedback.
        `
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}