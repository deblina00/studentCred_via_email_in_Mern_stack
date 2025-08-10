const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, textData, htmlTemplate = null) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let html = null;

  if (htmlTemplate) {
    const templatePath = path.join(__dirname, "../emails", htmlTemplate);
    html = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders in the template like {{username}}, {{password}}, etc.
    Object.keys(textData).forEach((key) => {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), textData[key]);
    });
  }

  await transporter.sendMail({
    from: `"School Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    text: `Welcome ${textData.username}, your credentials have been sent.`,
    html,
  });
};

module.exports = sendEmail;
