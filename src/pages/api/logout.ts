import { sessionOptions } from "@/data/sessionOptions";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.send({ message: 'ok' })
}

