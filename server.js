const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mail = require("./config/nodemailer");
const chi = require("./config/mailChimp");
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/subscribes", mail, chi, (req, res) => {
  res.json({ message: "Message recived Thankyou!" });
});
app.get("/", (req, res) => {
  res.json({ message: "Aplication is runing" });
});

const PORT = process.env.PORT || process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Backend is running on ${PORT}`);
});

module.exports = app;
