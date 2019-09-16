const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const exphbs = require("express-handlebars");
const helpers = require("./views/helpers/index");
const controllers = require("./controllers/index");
const app = express();
const mailhbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "antl.lomax@gmail.com",
//     pass: "Royalist777"
//   }
// });

// const mailOptions = {
//   from: "antl.lomax@gmail.com", // sender address
//   to: "antl.lomax@gmail.com", // list of receivers
//   subject: "Node email test", // Subject line
//   html: "<p>Successful test</p>" // plain text body
// };

// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) console.log("this is an error", err);
//   else console.log("this is the success", info);
// });

// express handlbears with nodemailer
// let nodemailerTransport = nodemailer.createTransport(
//   mg({
//     auth: {
//       user: "antl.lomax@gmail.com",
//       pass: "Royalist777"
//     }
//   })
// );

// let options = {
//   viewengine: {
//     extname: "hbs",
//     layoutsDir: path.join(__dirname, "views", "layouts"),
//     defaultLayout: "main",
//     partialsDir: path.join(__dirname, "views", "partials")
//   },
//   viewpath: "views/email",
//   extname: "hbs"
// };

// nodemailerTransport.use("compile", mailhbs(options));
// nodemailerTransport.sendMail(
//   {
//     from: "antl.lomax@gmail.com",
//     to: "antl.lomax@gmail.com",
//     subject: "test",
//     template: "email"
//   },
//   (err, results) => {
//     if (err) console.log("Error", err);
//     else console.log("Response" + results);
//   }
// // );

// transporter.use("compile", mailhbs(options));
// let mail = {
//   from: "antl.lomax@gmail.com",
//   to: "antl.lomax@gmail.com",
//   subject: "test",
//   template: "email",
//   context: {
//     name: "name"
//   }
// };

// transporter.sendMail(mail);

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
// app.engine(
//   "hbs",
//   exphbs({
//     extname: "hbs",
//     layoutsDir: path.join(__dirname, "views", "layouts"),
//     partialsDir: path.join(__dirname, "views", "partials"),
//     defaultLayout: "main",
//     helpers
//   })
// );

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
  }
);

app.set("port", process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, "..", "public", "assets", "favicon.ico")));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(controllers);

module.exports = app;
