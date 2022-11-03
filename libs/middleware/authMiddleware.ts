import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import 'dotenv/config'

const secret_key = process.env.SECRET_KEY || "";
export async function middleware(
  req: NextRequest,
  ev: NextFetchEvent,
){
  try {
    if(req.cookies.has('accessToken')){
      const accessToken = req.cookies.get('accessToken');
      if(accessToken !== undefined){
        jwt.verify(accessToken, secret_key, (err, decoded) => {
          if(err){
            return new Response(
              JSON.stringify({err}),
              { status: 401 },
            );
          };
          return NextResponse.next();
        })
      }else{
        return new Response(
          JSON.stringify({"message":"로그인이 필요한 기능입니다."}),
          { status: 401 },
        );
      }
    }
  } catch (error:any) {
    return new Response(
      JSON.stringify({error}),
      { status: 401 },
    );
  }

  
}