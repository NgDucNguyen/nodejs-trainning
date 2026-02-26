import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
} from "../controllers/user.controller";

const rounter = express.Router();

const webRoutes = (app: Express) => {
  rounter.get("/", getHomePage);

  rounter.get("/create-user", getCreateUserPage);
  rounter.post("/handle-create-user", postCreateUser);

  app.use("/", rounter);
};

export default webRoutes;
