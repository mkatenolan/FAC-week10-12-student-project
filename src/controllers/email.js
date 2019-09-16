const mailhbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");

exports.post = (req, res) => {
console.log(req);
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
  service: 'SendGrid',
  auth: {

    api_key:
      "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"


  }
};
let mailer = nodemailer.createTransport(sgTransport(send_grid));
mailer.use("compile", mailhbs(options));
mailer.sendMail(
  {
    from: "mkatenolan@gmail.com",
    to: "antl.lomax@gmail.com",
    subject: "Any Subject",
    template: "email_body",
    context: {
      test: 'test'
    }
  },
  (error, response) => {
    if (error) console.log(error);
    else console.log(response, "mail sent to ");

    mailer.close();
  });
}
