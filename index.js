// de giao tiep voi tep .env
import "dotenv/config";

import express from "express";
import expressLayouts from "express-ejs-layouts";

import Index from "./server/routes/index.js";
import Dashboard from "./server/routes/dashboard.js";
import Auth from "./server/routes/auth.js";

import db from "./server/config/db.js";

import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

const app = express();
const port = 5000 || process.env.PORT;

app.use(
  session({
    secret: "2511",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
    }),
    // cookie: { maxAge: new Date(Date.now() + 3600000) },
    // Date,now() - days * 24 * 60 * 60 * 1000
  })
);

app.use(passport.initialize());
//app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to Dadabase
db.connectDB();

// Static files
app.use(express.static("public"));

// Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", Auth);
app.use("/", Index);
app.use("/", Dashboard);

// Handle 404
app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
