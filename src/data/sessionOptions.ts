// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { IUser } from "@/store/auth/authSlice";
import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_PASS as string,
  cookieName: process.env.COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    auth?: IUser;
  }
}

