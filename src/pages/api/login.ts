import { sessionOptions } from "@/data/sessionOptions";
import { LoginResponse } from "@/services";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { DecodedToken, IUser } from "@/store/auth/authSlice";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, role = 'reader' } = await req.body;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string
  const reqData = {
    email,
    password
  }
  try {
    const dataRaw = await axios.post(`${BASE_URL}/auth/login/${role}`, reqData)

    const data = dataRaw.data as LoginResponse

    const token = data.data.token

    const auth = token ? jwt_decode<DecodedToken>(token) : {
      email: "",
      exp: 0,
      iat: 0,
      role: 'reader',
      token: "",
      userId: 0,
      isLogin: false
    };

    req.session.auth = { ...auth, token, isLogin: true } as IUser

    await req.session.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
}

