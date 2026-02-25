const express = require("express");

const app = express();

const PORT = 808;
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/v1", (req, res) => {
  res.send("Tao la Nguyen");
});

app.listen(PORT, () => {
  console.log(`My app is rynning on port: ${PORT}`);
});
