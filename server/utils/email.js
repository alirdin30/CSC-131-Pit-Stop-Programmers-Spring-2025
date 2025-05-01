import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  user: process.env.EMAIL_USER, // from .env
  pass: process.env.EMAIL_PASS         // from .env
});

export const sendResetPasswordEmail = async (email, resetLink) => {
  const mailOptions = {
    from: `"Pit Stop Programmers" <${process.env.EMAIL_USER}>`, // Use value from .env
    to: email,
    subject: 'Reset Your Password',
    text: `Click the link to reset your password: ${resetLink}`,
    html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset password email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};