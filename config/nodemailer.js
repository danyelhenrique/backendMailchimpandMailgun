const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
require("dotenv").config();

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN_NODEMAILER
  }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMAIL = (req, res, next) => {
  const { name, email, message } = req.body.data;
  const mailOptions = {
    from: email,
    to: "danyelhenriquefidel@gmail.com",
    subject: name,
    text: message
  };

  transporter.sendMail(mailOptions, (err, data) => {
    try {
      if (err) {
        res.status(400).send("ERRO TO SEND MESSAGE");
        console.log(err);
        return;
      }
    } catch (error) {
      console.log("Faild do send email");
    }
  });

  next();
};

module.exports = sendMAIL;
