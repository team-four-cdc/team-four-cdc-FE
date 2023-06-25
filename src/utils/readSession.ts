import { sessionOptions } from "@/data/sessionOptions";
import { IUser } from "@/store/auth/authSlice";
import { unsealData } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/app-render";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

/**
 * Can be called in page/layout server component.
 * @param cookies ReadonlyRequestCookies
 * @returns SessionUser or null
 */
export async function getRequestCookie(
  cookies: ReadonlyRequestCookies | RequestCookies
): Promise<IUser | null> {
  const { cookieName } = sessionOptions
  const found = cookies.get(cookieName);

  if (!found) return null;

  const { user } = await unsealData(found.value, {
    password: sessionOptions.password
  });

  return user  as IUser;
}
