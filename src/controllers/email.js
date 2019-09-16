const mailhbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");

exports.post = (req, res) => {
var options = {
  viewEngine: {
    extname: ".hbs",
    layoutsDir: "views/email/",
    defaultLayout: "template",
    partialsDir: "views/partials/"
  },
  viewPath: "views/email/",
  extName: ".hbs"
};
var sgTransport = require("nodemailer-sendgrid-transport");
//using sendgrid as transport, but can use any transport.
var send_grid = {
  auth: {
    api_user: "tonylomax",
    api_key:
      "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"
  }
};
var mailer = nodemailer.createTransport(sgTransport(send_grid));
mailer.use("compile", mailhbs(options));
mailer.sendMail(
  {
    from: "antl.lomax@gmail.com",
    to: "antl.lomax@gmail.com",
    subject: "Any Subject",
    template: "email_body",
    context: {}
  },
  (error, response) => {
    if (error) console.log(error);
    else console.log(response, "mail sent to ");

    mailer.close();
  });
}
