import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pitstopprogrammers@gmail.com', // will be in process.env.EMAIL_USER
    pass: 'lznwslwwwkiqnmta'         // will be in process.env.EMAIL_PASS
  },
});

export const sendResetPasswordEmail = async (email, resetLink) => {
  const mailOptions = {
    from: '"Pit Stop Programmers" <pitstopprogrammers@gmail.com>',
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