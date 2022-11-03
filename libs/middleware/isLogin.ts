import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import client from "../client";
import jwt from "jsonwebtoken"
// import cookies from 'next-cookies';

import 'dotenv/config'
const secret_key = process.env.SECRET_KEY || "";

export function middleware(
   req: NextRequest,
   ev: NextFetchEvent,
 ) {
  try {
    if(!req.cookies.has('accessToken')){
      return NextResponse.rewrite(new URL('/login', req.url)); 
    } else {
      return new Response(
        JSON.stringify({"message": "이미 로그인된 상태입니다."}),
        { status: 401 },
      )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({error}),
      { status: 400 },
    )
  }
 }

 export const config = {
   matcher: ['/api/user/login', '/api/user/signup']
 }