import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
} from "controllers/user.controller";
import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
} from "controllers/admin/dashboard.controller";

const rounter = express.Router();

const webRoutes = (app: Express) => {
  rounter.get("/", getHomePage);

  rounter.get("/create-user", getCreateUserPage);
  rounter.post("/handle-create-user", postCreateUser);
  rounter.post("/handle-delete-user/:id", postDeleteUser);
  rounter.get("/handle-view-user/:id", getViewUser);
  rounter.post("/handle-update-user", postUpdateUser);

  //admin routes
  rounter.get("/admin", getDashboardPage);
  rounter.get("/admin/user", getAdminUserPage);
  rounter.get("/admin/create-user", getCreateUserPage);
  rounter.get("/admin/order", getAdminOrderPage);
  rounter.get("/admin/product", getAdminProductPage);
  app.use("/", rounter);
};

export default webRoutes;
