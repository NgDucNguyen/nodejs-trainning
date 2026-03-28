import { prisma } from "conflig/client";
import passport, { use } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserWithRoleById } from "services/client/auth.service";
import { comparePassword } from "services/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, async function verify(
      req,
      username,
      password,
      callback,
    ) {
      const { session } = req as any;
      const messages = session?.messages ?? [];
      if (session?.messages?.length) {
        session.messages = [];
      }
      console.log(">>> check username/password: ", username, passport);
      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (!user) {
        //throw
        // throw new Error(`Username: ${username} not found`);
        return callback(null, false, {
          message: `Username/password invalid`,
        });
      }
      //conpare password
      const isMatch = await comparePassword(password, user.password);
      console.log(">>> Check password match: ", isMatch); // Thêm dòng này
      if (!isMatch) {
        // throw new Error(`Invalid password`);
        console.log(">>> Login failed: Wrong password");
        return callback(null, false, {
          message: `Username/password invalid`,
        });
      }
      return callback(null, user as any);
    }),
  );

  //gui session id va kiem tra -> lay ra id
  passport.serializeUser(function (user: any, callback) {
    callback(null, {
      id: user.id,
      username: user.username,
    });
  });
  //query xuong db
  passport.deserializeUser(async function (user: any, callback) {
    const { id, username } = user;
    //query to db
    const userInDB: any = await getUserWithRoleById(id);
    return callback(null, { ...userInDB });
  });
};

export default configPassportLocal;
