import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "./data/sessionOptions";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  // do anything with session here:
  const { auth } = session;

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  if (!auth) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!!auth && auth.role === 'reader') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res;
};

export const config = {
  matcher: ["/dashboard-penulis/(.*)", "/dashboard-penulis"],
};
