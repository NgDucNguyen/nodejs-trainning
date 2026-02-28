import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
} from "controllers/user.controller";

const rounter = express.Router();

const webRoutes = (app: Express) => {
  rounter.get("/", getHomePage);

  rounter.get("/create-user", getCreateUserPage);
  rounter.post("/handle-create-user", postCreateUser);
  rounter.post("/handle-delete-user/:id", postDeleteUser);

  app.use("/", rounter);
};

export default webRoutes;
