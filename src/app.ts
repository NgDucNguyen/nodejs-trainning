// const express = require("express");
import express from "express";
import "dotenv/config";
import webRoutes from "src/routes/web";
import initDatabase from "conflig/seed";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";
import session from "express-session";
const app = express();

const PORT = process.env.PORT || 808;

// conflig view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//conflig static files :images/css/js
app.use(express.static("public"));

//config session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  }),
);

//config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

//conflig route
webRoutes(app);

//seeding data
initDatabase();

//handle 404 not found
app.use((req, res) => {
  res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(`My app is rynning on port: ${PORT}`);
});
