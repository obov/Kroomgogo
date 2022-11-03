import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
// import { setCookie } from '../../utils/cookies'
import client from "../client";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret_key = process.env.SECRET_KEY || "";

let userId: string | object | Buffer;

export const authNoRefreshToken = async (
  req: NextRequest,
  ev: NextFetchEvent
) => {
  try {
    if (req.cookies.has("refreshToken")) {
      const refreshToken = req.cookies.get("refreshToken");
      if (refreshToken !== undefined) {
        const identifier = jwt.verify(refreshToken, secret_key);

        if (!identifier || identifier) {
          throw new Error("토큰이 존재하지 않습니다.");
        }
        //@ts-ignore
        const user = await client.user.findUnique({ where: { identifier } });
        if (user == null) {
          throw new Error("토큰이 유효하지 않습니다. 다시 로그인해 주십시오.");
        }

        if (user?.refreshToken !== refreshToken) {
          throw new Error(
            "서버에 저장된 토큰 정보와 일치하지 않습니다. 다시 로그인해 주십시오."
          );
        }

        const response = NextResponse.next();
        response.cookies.set(
          "accessToken",
          jwt.sign(userId, secret_key, { expiresIn: "1h" })
        ); // body에 담아주도록 수정

        return response;
      }
    } else {
      throw new Error("토큰이 존재하지 않습니다.");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
