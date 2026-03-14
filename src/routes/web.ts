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
import fileUploadMiddleware from "src/middleware/multer";

const rounter = express.Router();

const webRoutes = (app: Express) => {
  rounter.get("/", getHomePage);

  rounter.get("/create-user", getCreateUserPage);

  //admin routes
  rounter.get("/admin", getDashboardPage);
  rounter.get("/admin/user", getAdminUserPage);
  rounter.get("/admin/create-user", getCreateUserPage);
  rounter.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser,
  );
  rounter.post("/admin/delete-user/:id", postDeleteUser);
  rounter.get("/admin/view-user/:id", getViewUser);
  rounter.post(
    "/admin/update-user",
    fileUploadMiddleware("avatar"),
    postUpdateUser,
  );

  rounter.get("/admin/order", getAdminOrderPage);
  rounter.get("/admin/product", getAdminProductPage);
  app.use("/", rounter);
};

export default webRoutes;
