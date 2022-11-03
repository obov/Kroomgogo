// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

import axios, { Axios, AxiosResponse } from "axios";
const cheerio = require("cheerio");

type ProductInfo = {
  imgUrl: string;
  brand: string;
  title: string;
  sub_title: string;
  quote: string;
  recent_price: number;
  buy_price: number;
  sell_price: number;
  wish_count: number;
  model_num: string;
  release_date: string;
  color: string;
  release_price: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;

  const getHTML = async (pid: string | string[]) => {
    try {
      return axios.get(`https://kream.co.kr/products/${pid}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (typeof pid === "undefined") throw new Error();

  const html = await getHTML(pid);

  console.log("시작");
  if (typeof html === "undefined") throw new Error();
  const $ = cheerio.load(html.data);
  const bodyList = await $(
    "#__layout > div > div:nth-child(2) > div.content > div.column_bind "
  ).map((i: any, e: any) => {
    const imgUrl: string = $(e).find("img.image").attr("src");
    const brand: string = $(e).find("a.brand").text().trimStart().trimEnd();
    const title: string = $(e).find("p.title").text().trimStart().trimEnd();
    const sub_title: string = $(e)
      .find("p.sub_title")
      .text()
      .trimStart()
      .trimEnd();
    const quote: string = $(e)
      .find("div.fluctuation")
      .text()
      .trimStart()
      .trimEnd();
    const recent_price: number = parseInt(
      $(e).find("span.num").text().replace(/,/g, "")
    );
    const buy_price: number = parseInt(
      $(e).find("span.amount").text().split("원")[0].replace(/,/g, "")
    );
    const sell_price: number = parseInt(
      $(e).find("span.amount").text().split("원")[1].replace(/,/g, "")
    );
    const wish_count: number = parseInt(
      $(e).find("span.wish_count_num").text()
    );
    const model_num: string = $(e)
      .find("dd.product_info")
      .text()
      .split("  ")[0];
    const release_date: string = $(e)
      .find("dd.product_info")
      .text()
      .split("  ")[1];
    const color: string = $(e).find("dd.product_info").text().split("  ")[2];
    const release_price: string = $(e)
      .find("dd.product_info")
      .text()
      .split("  ")[3];

    let ProductInfo: ProductInfo = {
      imgUrl: imgUrl,
      brand: brand,
      title: title,
      sub_title: sub_title,
      quote: quote,
      recent_price: recent_price,
      buy_price: buy_price,
      sell_price: sell_price,
      wish_count: wish_count,
      model_num: model_num,
      release_date: release_date,
      color: color,
      release_price: release_price,
    };

    return ProductInfo;
  });

  console.log(bodyList["0"]);

  res.json(bodyList["0"]);
}
