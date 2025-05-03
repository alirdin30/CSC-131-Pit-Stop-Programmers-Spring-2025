import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Debug log (without exposing actual credentials)
console.log('Email configuration check:');
console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
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

export const sendAppointmentConfirmationEmail = async (email, service, date, time) => {
  const mailOptions = {
    from: '"Pit Stop Programmers" <pitstopprogrammers@gmail.com>',
    to: email,
    subject: 'Appointment Confirmation',
    text: `Hello, your appointment for ${service} is set for ${date} at ${time}.\n\nThank you for choosing Pit Stop Programmers! We look forward to serving you.`,
    html: `
      <p>Hello,</p>
      <p>Your appointment for <strong>${service}</strong> is set for <strong>${date}</strong> at <strong>${time}</strong>.</p>
      <p>Thank you for choosing Pit Stop Programmers! We look forward to serving you.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Appointment confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending appointment confirmation email:', error.message);
    return false;
  }
};