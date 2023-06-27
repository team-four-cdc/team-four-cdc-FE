import { sessionOptions } from "@/data/sessionOptions";
import { LoginResponse } from "@/services";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { DecodedToken, IUser } from "@/store/auth/authSlice";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line
  const { email, password, role = 'reader' }: { email: string; password: string; role: 'reader' | 'creator' } = await req.body;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string
  const reqData = {
    email,
    password
  }

  await axios.post<LoginResponse>(`${BASE_URL}/auth/login/${role}`, reqData).then(async (dataRaw) => {
    const data = dataRaw.data
    const token = data?.data?.token
    const fullName = data?.data?.fullName

    const auth = token ? jwt_decode<DecodedToken>(token) : {
      email: "",
      fullName: "",
      exp: 0,
      iat: 0,
      role: 'reader',
      token: "",
      userId: 0,
      isLogin: false
    };
    req.session.auth = { ...auth, fullName, token, isLogin: true } as IUser
    await req.session.save();
    res.json(data);
  }).catch(error => {
    // eslint-disable-next-line
    const response = error.response.data as LoginResponse

    res.status(response.status).json(response);
  })
}

