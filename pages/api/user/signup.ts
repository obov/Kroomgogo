import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";
import bcrypt from 'bcryptjs'
import sanitizeHtml from 'sanitize-html';
/* 
 -- sanitize-html default options --
 allowedTags: [
  "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
  "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
  "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
  "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
  "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
  "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
  "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"
],
disallowedTagsMode: 'discard',
allowedAttributes: {
  a: [ 'href', 'name', 'target' ],
  // We don't currently allow img itself by default, but
  // these attributes would make sense if we did.
  img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
},
// Lots of these won't come up by default because we don't allow them
selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
// URL schemes we permit
allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
allowedSchemesByTag: {},
allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
allowProtocolRelative: true,
enforceHtmlBoundary: false
*/
interface bodyTypes {
  email: string;
  password: string;
  size: number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
    const {email, password, size}:bodyTypes=req.body;
    const cleanEmail = sanitizeHtml(email);
    const cleanPassword =sanitizeHtml(password);

    try {
        const user = await client.user.findUnique({
            where:{email:cleanEmail}
        })
    
        if(user){
            res.status(400).send("중복된 이메일 입니다.")
        }
        const encPass = await bcrypt.hash(cleanPassword, 10);
        const nickname = email.split("@")[0]
        await client.user.create({
            data:{
                email,
            nickname,
                //@ts-ignore
                size,
                password: encPass
            }
        })
        res.status(200).send("회원가입이 완료 되었습니다.")
    } catch (error) {
        res.status(400).json(error)
    }
    const encPass = await bcrypt.hash(password, 10);
    const nickname = email.split("@")[0];
    await client.user.create({
      data: {
        email,
        nickname,
        // @ts-ignore
        size,
        password: encPass,
      },
    });
    res.status(200).send("회원가입이 완료 되었습니다.");
  
}
