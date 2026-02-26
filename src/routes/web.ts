import express, { Express } from "express";

const rounter = express.Router();

const webRoutes = (app: Express) => {
  rounter.get("/", (req, res) => {
    res.render("home.ejs");
  });

  rounter.get("/v1", (req, res) => {
    res.send("Tao la Nguyen GAY");
  });

  rounter.get("/abc", (req, res) => {
    res.send("ABCDEF");
  });
  app.use("/", rounter);
};

export default webRoutes;
