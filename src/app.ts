// const express = require("express");
import express from "express";
import "dotenv/config";
const app = express();

const PORT = process.env.PORT || 808;
app.get("/", (req, res) => {
  res.send("Hello world env");
});

app.get("/v1", (req, res) => {
  res.send("Tao la Nguyen");
});

app.listen(PORT, () => {
  console.log(`My app is rynning on port: ${PORT}`);
  console.log("env port: ", process.env.PORT);
});
