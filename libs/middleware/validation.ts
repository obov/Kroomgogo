import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import Joi from "joi";

export function joiValidation(
    req: NextRequest,
    ev: NextFetchEvent,
  ) {
    const emailRegExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    const passwordRegExp = /(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])/i;
    const schema = Joi.object().keys({
        email: Joi.string().regex(emailRegExp).email(),
        password: Joi.string().regex(passwordRegExp)
    });
    try {
        schema.validate(req.body)
    } catch (error) {
        return new Response(
            JSON.stringify({error}),
            { status: 400 },
          )
    }
    
    return NextResponse.rewrite(new URL('/home', req.nextUrl)); // 경로 수정 필요
    
  }
export const config = {
  matcher: ['/api/user/signup']
}