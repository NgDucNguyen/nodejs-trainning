import { prisma } from "conflig/client";
import { log } from "console";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countUser == 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "nguyenducnguyen@gmail.com",
          password: "123456",
          accountType: "SYSTEM",
        },
        {
          username: "admin@gmail.com",
          password: "123456",
          accountType: "SYSTEM",
        },
      ],
    });
  } else if (countRole == 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Admin thì full quyền",
        },
        {
          name: "USER",
          description: "User thông thường",
        },
      ],
    });
  } else {
    console.log(">>> ALREADY INIT DATA...");
  }
};

export default initDatabase;
