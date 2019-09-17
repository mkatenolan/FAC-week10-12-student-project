const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const exphbs = require("express-handlebars");
const helpers = require("./views/helpers/index");
const controllers = require("./controllers/index");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main",
    helpers
  })
);

app.use(cookieParser());
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, "..", "public", "assets", "favicon.ico")));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(controllers);


module.exports = app;
