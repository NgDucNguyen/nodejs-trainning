import { prisma } from "conflig/client";
import { comparePassword } from "services/user.service";
import jwt from "jsonwebtoken";
import "dotenv/config";
const handleGetAllUser = async () => {
  return await prisma.user.findMany();
};

const handleGetUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const handleUpdateUserById = async (
  id: number,
  fullName: string,
  address: string,
  phone: string,
) => {
  return await prisma.user.update({
    where: { id },
    data: {
      fullName,
      address,
      phone,
    },
  });
};

const handleDeleteUserById = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

const handleUserLogin = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    //throw
    throw new Error(`Username: ${username} not found`);
  }
  //conpare password
  const isMatch = await comparePassword(password, user.password);
  console.log(">>> Check password match: ", isMatch); // Thêm dòng này
  if (!isMatch) {
    throw new Error(`Invalid password`);
  }

  //co user login => dinh nghia access token
  const payload = {
    id: user.id,
    email: user.username,
    roleId: user.roleId,
  };
  const secret = process.env.JWT_SECRET!;
  const access_token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return access_token;
};
export {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleUserLogin,
};
