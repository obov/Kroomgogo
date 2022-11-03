// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

interface Product {
  productId: number;
  price: number;
  nameEng: string;
  brand: string;
  nameKr: string;
  quickdlivery: boolean;
  imgUrl: string;
  createdAt: Date;
  pid: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { brands, quickDelivery, numOfRow, pageNo, priceNum } = req.query;
  // brands=> Louis Vuitton, Rolex,Celine,Acne Studios,Moncler,Apple,Prada, all
  if (typeof brands === "string" || typeof brands === "undefined") {
    if (brands !== "all") {
      brands;
    } else {
      brands = undefined;
    }
  } else {
    throw new Error();
  }

  // quickDelivery=> on -> true / off -> false / 기타 -> undefind
  let quickDeliveryBool: boolean | undefined = true; // db where value
  if (
    typeof quickDelivery === "string" ||
    typeof quickDelivery === "undefined"
  ) {
    if (quickDelivery === "off") quickDeliveryBool = false;
    if (quickDelivery !== "on" && quickDelivery !== "off")
      quickDeliveryBool = undefined;
  } else {
    throw new Error();
  }

  // priceNum => 0 : 전체 / 1 : 10만원 이하 / 2 : 10 ~ 30 이하 / 3 : 30 ~ 50 이하 / 4 : 50 이상
  let andgte: number | undefined; // and 조건에서 보다 크거나 같은 것을 가져옴
  let andlte: number | undefined; // and 조건에서 보다 작거나 같은 것을 가져옴
  let andgt: number | undefined; // and 조건에서 보다 큰 것을 가져옴
  let andlt: number | undefined; // and 조건에서 보다 작작은 같은 것을 가져옴

  let notgte: number | undefined; // not 조건에서 보다 크거나 같은 것을 제외함
  let notlte: number | undefined; // not 조건에서 보다 작거나 같은 것을 제외함
  let notgt: number | undefined; // not 조건에서 보다 큰 것을 제외함
  let notlt: number | undefined; // not 조건에서 보다 작은 것을 제외함

  if (typeof priceNum !== "string" || typeof priceNum === "undefined")
    throw new Error();
  switch (priceNum) {
    case "1": // 10만원 이하
      andlte = 100000;
      break;
    case "2": // 10 ~ 30만원 이하
      andgte = 100000;
      andlte = 300000;
      break;
    case "3": // 30 ~ 50만원 이하
      andgte = 300000;
      andlte = 500000;
      break;
    case "4": // 50만원 이상
      andgte = 500000;
      break;
    case "12": // 0 ~ 30만원 이하
      andlte = 300000;
      break;
    case "13": // 10만원 이하 & 30 ~ 50만원 이하
      andgte = 0;
      andlte = 500000;
      notgt = 100000;
      notlt = 300000;
      break;
    case "14": // 10만원 이하 & 50만원 이상
      notgt = 100000;
      notlt = 500000;
      break;
    case "123": // 50만원 이하
      notgt = 500000;
      break;
    case "124": // 0 ~ 30만원 이하 & 50만원 이상
      notgt = 300000;
      notlt = 500000;
      break;
    case "134": // 10만원 이하 30만원 이상
      notgt = 100000;
      notlt = 300000;
      break;
    case "23": // 10만원 이상 50만원 이하
      andgte = 100000;
      andlte = 500000;
      break;
    case "24": // 10 ~ 30 이하 & 50 이상
      andgte = 100000;
      notgt = 300000;
      notlt = 500000;
      break;
    case "234": // 10만원 이상
      andgte = 100000;
      break;
    case "34": // 30만원 이상
      andgte = 300000;
      break;
    default:
      andgte = andlte = undefined;
      break;
  }

  // numOfRow=> 한 페이지 결과 수
  if (typeof numOfRow !== "string" || typeof numOfRow === "undefined")
    throw new Error();

  // pageNo=> pageNum 반환될 페이지 쪽수
  if (typeof pageNo !== "string" || typeof pageNo === "undefined")
    throw new Error();
  // @ts-ignore
  const data: Product[] = await client.product.findMany({
    where: {
      AND: {
        brand: brands,
        quickdlivery: quickDeliveryBool,
        price: {
          gte: andgte, // 보다 크거나 같은 것을 가져옴
          lte: andlte, // 보다 작거나 같은 것을 가져옴
          gt: andgt,
          lt: andlt,
        },
      },
      NOT: {
        price: {
          gte: notgte, // 보다 크거나 같은 것을 가져옴
          lte: notlte, // 보다 작거나 같은 것을 가져옴
          gt: notgt,
          lt: notlt,
        },
      },
    },
    skip: (parseInt(pageNo) - 1) * parseInt(numOfRow),
    take: parseInt(numOfRow),
  });
  for (let list of data) {
    // console.log(list['nameKr'], list['quickdlivery'],list['price']);
    console.log(list);
  }
  
  !data.length
    ? res.status(204).json({ result: "검색 결과가 없습니다." })
    : res.status(201).json({ data , nextPageNo:parseInt(pageNo)+1});
}
