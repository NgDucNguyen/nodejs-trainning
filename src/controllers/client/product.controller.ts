import { Request, Response } from "express";
import { use } from "passport";
import { addProductToCart, getProductById } from "services/client/item.service";

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProductById(+id);
  return res.render("client/product/detail.ejs", {
    product,
  });
};

const postAddProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (user) {
    await addProductToCart(1, +id, user);
  } else {
    return res.redirect("/login"); // chua dang nhap thi ve login
  }
  return res.redirect("/"); // dang nhap roi thi vao gio hang
};
export { getProductPage, postAddProductToCart };
