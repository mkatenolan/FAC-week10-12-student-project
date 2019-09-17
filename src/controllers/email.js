const mailhbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
require("env2")("./.env");

exports.post = (req, res) => {
  console.log("we are in the post function");
  let email = req.body.email;
  let options = {
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "src/views/email",
      defaultLayout: "template",
      partialsDir: "views/partials/"
    },
    viewPath: "src/views/email",
    extName: ".hbs"
  };
  let sgTransport = require("nodemailer-sendgrid-transport");
  //using sendgrid as transport, but can use any transport.
  let send_grid = {
    service: "SendGrid",
    auth: {
      api_key: process.env.SEND_GRID_API_KEY
    }
  };
  let mailer = nodemailer.createTransport(sgTransport(send_grid));
  mailer.use("compile", mailhbs(options));
  mailer.sendMail(
    {
      from: "mkatenolan@gmail.com",
      to: email,
      subject: "Any Subject",
      template: "email_body",
      context: {
        test: "test"
      }
    },
    (error, response) => {
      if (error) console.log(error);
      else console.log(response, "mail sent to ");

      mailer.close();
    }
  );
};
