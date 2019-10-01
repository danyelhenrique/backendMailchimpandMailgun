const request = require("request");
require("dotenv").config();

function mailChimp(req, res, next) {
  const { email } = req.body.data;

  const mcData = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const mcDataPost = JSON.stringify(mcData);

  const options = {
    url: process.env.MAIL_CHIMP_URL,
    method: "POST",
    headers: {
      Authorization: `auth ${process.env.MAIL_AUTHORIZATION}`
    },
    body: mcDataPost
  };

  if (email) {
    request(options, (err, response, body) => {
      if (err) {
        console.log(err);
        res.status(400);
        return;
      }
    });
  }
  next();
}

module.exports = mailChimp;
