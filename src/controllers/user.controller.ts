import { Request, Response } from "express";
import {
  getAllRoles,
  getAllUsers,
  getUserById,
  handleCreateUser,
  handleDeleteUser,
  updateUserById,
} from "services/user.service";
const getHomePage = async (req: Request, res: Response) => {
  //get users
  const users = await getAllUsers();
  return res.render("home", {
    users: users,
  });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  console.log(roles);
  return res.render("admin/user/create.ejs", {
    roles,
  });
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;

  //handle create user
  const a = await handleCreateUser(fullName, email, address);
  return res.redirect("/");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id }: any = req.params;
  const a = await handleDeleteUser(id);
  return res.redirect("/");
};

const getViewUser = async (req: Request, res: Response) => {
  const { id }: any = req.params;
  //get user by id
  const user = await getUserById(id);
  return res.render("view-user.ejs", {
    id: id,
    user: user,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, email, address, fullName } = req.body;
  const a = await updateUserById(id, email, address, fullName);
  return res.redirect("/");
};
export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
