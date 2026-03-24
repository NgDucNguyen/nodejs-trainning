import { prisma } from "conflig/client";
import { ACCOUNT_TYPE } from "conflig/constant";
import { comparePassword, hashPassword } from "services/user.service";

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { username: email },
  });

  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (
  fullName: string,
  email: string,
  password: string,
) => {
  const newPassword = await hashPassword(password);
  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  if (userRole) {
    await prisma.user.create({
      data: {
        username: email,
        password: newPassword,
        fullName: fullName,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: userRole.id,
      },
    });
  } else {
    throw new Error("USer Role khong ton tai.");
  }
};

export { isEmailExist, registerNewUser };
