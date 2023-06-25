import { sessionOptions } from "@/data/sessionOptions";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.auth) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.auth,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}

