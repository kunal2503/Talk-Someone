const nodeMailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use environment variable for password
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">${subject}</h2>
          <p>${text}</p>
          <hr style="border:none; border-top:1px solid #eee;" />
          <p style="font-size: 0.9em; color: #777;">This is an automated message, please do not reply.</p>
        </div>
      `,
    });

    console.log("✅ Email sent:", info.response); // log success
  } catch (error) {
    console.error("❌ Failed to send email:", error); // log failure
  }
};

module.exports = sendMail;
