import express, { Express, Router } from "express";
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
import { getProductPage } from "controllers/client/product.controller";
import {
  getAdminCreateProductPage,
  getViewProduct,
  postAdminCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";

const rounter = express.Router();

const webRoutes = (app: Express) => {
  rounter.get("/", getHomePage);
  rounter.get("/product/:id", getProductPage);

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

  rounter.get("/admin/product", getAdminProductPage);
  rounter.get(
    "/admin/create-product",

    getAdminCreateProductPage,
  );
  rounter.post(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/product"),
    postAdminCreateProduct,
  );

  rounter.post("/admin/delete-product/:id", postDeleteProduct);
  rounter.get("/admin/view-product/:id", getViewProduct);
  rounter.post(
    "/admin/update-product",
    fileUploadMiddleware("image", "images/product"),
    postUpdateProduct,
  );
  rounter.get("/admin/order", getAdminOrderPage);
  app.use("/", rounter);
};

export default webRoutes;
