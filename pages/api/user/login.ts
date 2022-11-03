// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import sanitizeHtml from "sanitize-html";
import bcrypt from "bcryptjs"
const secret_key = process.env.SECRET_KEY || ""
interface reqBody {
  email: string | undefined;
  password: string | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password }: reqBody = req.body;
  try {
    if(!email||!password){
      throw new Error("아이디 혹은 비밀번호를 입력해 주세요")
    }

    const cleanEmail = sanitizeHtml(email);
    const cleanPassword = sanitizeHtml(password);
    console.log(cleanEmail,cleanPassword)
   const user = await client.user.findUnique({where:{email:cleanEmail}});
   const userId = user?.userId;
   const encPass = user?.password;
  if(encPass !== undefined){
    const re = await bcrypt.compare(cleanPassword, encPass);
    if(!re){
      res.status(400).send("이메일 또는 패스워드가 일치하지 않습니다.");
    }
  }else {
    res.status(400).send("존재하지 않는 유저입니다.");
  }
  
  const accessToken = jwt.sign(
    {userId},
    secret_key,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    {userId},
    secret_key,
    { expiresIn: '7d' }
  );
  
  await client.user.update({where:{userId},data:{refreshToken}});

  res.setHeader('Set-Cookie', `accessToken: ${accessToken} expires=1`);
  res.status(200).json({refreshToken});

  } catch (error) {
    res.status(400).json({ error, result: "로그인에 실패하였습니다." });
  }
}

