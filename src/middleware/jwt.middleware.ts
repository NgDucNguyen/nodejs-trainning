import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const whiteList = ["/add-product-to-cart", "/login"];

  const isWhiteList = whiteList.some((route) => route === path);
  if (isWhiteList) {
    next();
    return;
  }
  const token = req.headers["authorization"]?.split(" ")[1]; // format: Bearer <token>

  try {
    const dataDecoded: any = jwt.verify(
      token!,
      process.env.JWT_SECRET as string,
    );
    console.log(dataDecoded);
    req.user = {
      id: dataDecoded.id,
      username: dataDecoded.email,
      password: "",
      fullName: "",
      address: "",
      phone: "",
      accountType: dataDecoded.accountType,
      avatar: dataDecoded.avatar,
      roleId: dataDecoded.roleId,
      role: dataDecoded.role,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      data: null,
      message: "Token không hợp lệ (không truyển lên token hoặc token hết hạn",
    });
  }
};
export { checkValidJWT };
