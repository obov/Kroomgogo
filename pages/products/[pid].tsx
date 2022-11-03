import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import icons from "../../components/icons";
import useFixoluteBox from "../../hooks/useFixoluteBox";
import { cls } from "../../utils";
import { format, add } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Product = () => {
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox();
  const pid = 50119;
  const { data, isLoading } = useQuery(["hi"], async () => {
    const { data } = await axios.get(`/api/productDetail?pid=${pid}`);
    return data;
  });
  console.log(data);
  return (
    <>
      <div className="w-[1280px] mx-auto px-10 pt-[30px] pb-40 h-[2120px]">
        <div className="w-[600px] relative pr-10 bg-red-300 float-left">
          <div
            className="h-[560px] bg-slate-300 w-[560px] "
            ref={fixsolute}
            style={fixoluteStyle}
          ></div>
        </div>
        <div
          ref={limit}
          className="h-auto pl-10 w-[600px] float-right border-l border-l-gray-300"
        >
          <div className="h-8">
            <Link
              href="#"
              className="text-lg font-extrabold underline-offset-4 underline"
            >
              Undermycar
            </Link>
          </div>
          <div className="h-[44px] mb-1 text-lg font-normal">
            Undermycar Operation Chromite Kerberos Oversized Varsity Jacket Ox
            Blood - 22FW
          </div>
          <div className="h-[17px]"></div>
          <div className="h-[57px] pt-[19px] pb-[12px] border-b border-b-slate-300 flex justify-between">
            <div className="text-[13px]">사이즈</div>
            <div className="text-base font-bold flex justify-center">
              <p className="mr-[5px]">모든 사이즈</p>
              <icons.Check></icons.Check>
            </div>
          </div>
          <div className="h-[47px] mt-[11px] flex justify-between items-center">
            <div>최근 거래가</div>
            <div className="text-base font-bold flex flex-col items-end">
              <p className="">1,270,000원</p>
              <p>asdasd</p>
            </div>
          </div>
          <div className="h-[60px] mt-[17px] flex justify-between gap-[10px]">
            <div className="w-[206px] h-[60px] flex-1 flex justify-start rounded-xl items-center bg-red-400 text-white">
              <div className="border-r-[0.2px] border-r-gray-400/25 w-[55px] text-lg flex justify-center items-center h-full">
                구매
              </div>
              <div className="ml-[10px]">
                <div className="text-[15px] font-bold">1,230,000원</div>
                <div className="text-[11px]">1,230,000원</div>
              </div>
            </div>
            <div className="w-[206px] h-[60px] flex-1 flex justify-start rounded-xl items-center bg-green-400 text-white">
              <div className="border-r-[0.2px] border-r-gray-400/25 w-[55px] text-lg flex justify-center items-center h-full">
                판매
              </div>
              <div className="ml-[10px]">
                <div className="text-[15px] font-bold">1,200,000원</div>
                <div className="text-[11px]">1,200,000원</div>
              </div>
            </div>
          </div>
          <div className="h-[60px] mt-[12px] flex justify-center items-center border rounded-lg">
            <icons.BookMark className="mr-1" /> 관심 상품 326
          </div>
          <h3 className="pt-[39px] pb-[13px] h-[74px] text-lg font-bold">
            상품정보
          </h3>
          <div className="h-[75px] border-y-2 flex divide-x-2 py-5">
            {["모델번호", "출시일", "컬러", "판매가"].map((e) => (
              <div key={e} className="first:pl-0 pl-3 pr-3 flex-1">
                <div className="text-gray-400 text-xs">{e}</div>
                <div className="text-gray-800 text-sm">{e}</div>
              </div>
            ))}
          </div>
          <h3 className="h-[56px] pt-[39px] text-sm text-gray-900">배송정보</h3>
          <div className="h-[70px] pt-[12px] pb-[18px] flex">
            <div className="mr-[14px]">
              <img
                src="https://kream-phinf.pstatic.net/MjAyMTExMjFfMjU5/MDAxNjM3NDczNzU0MjA1.ON3pvFYAq_xSSaNWDgUWe1YfIx-C0fm91PDtcsUn3AEg.Q4EbbNWl_ua916jg0NQ0dWOS3h7W9eiiI2kK9YPWlgwg.PNG/a_120a84f036724d0d97a2343aafff4ecf.png"
                width={40}
                height={40}
                alt=""
              />
            </div>
            <div>
              <div className="text-sm flex gap-1">
                <p className="font-semibold">빠른배송 </p>
                <p>5,000원</p>
              </div>
              <div className="text-sm text-gray-400">
                지금 결제시{" "}
                <span className="text-blue-600">
                  내일{" "}
                  {format(add(Date.now(), { days: 1 }), "M/d(eee)", {
                    locale: ko,
                  })}{" "}
                  도착 예정
                </span>
              </div>
            </div>
          </div>
          <div className="h-[70px] pt-[12px] pb-[18px] flex">
            <div className="mr-[14px]">
              <img
                src="https://kream-phinf.pstatic.net/MjAyMTExMjlfMTQ4/MDAxNjM4MTc4MjI5NTk3.2phJLPtRvFqViNfhZu06HzNRiUBlT4cmZR4_Ukqsyesg.ikrfWOrL7WXCVO0Rqy5kMvOn3B2YpjLUj6RuJqosPX0g.PNG/a_8b54cbca40e945f4abf1ee24bdd031f7.png"
                width={40}
                height={40}
                alt=""
              />
            </div>
            <div>
              <div className="text-sm flex gap-1">
                <p className="font-semibold">일반배송 </p>
                <p>3,000원</p>
              </div>
              <div className="text-sm text-gray-400">
                검수 후 배송 ・ 5-7일 내 도착 예정
              </div>
            </div>
          </div>
          <div className="h-[69px] pt-[19px] pb-[10px] flex">
            <div className="mr-[14px]">
              <img
                src="https://kream-phinf.pstatic.net/MjAyMTExMjFfMjE5/MDAxNjM3NDczODM5MTg0.K9c0FOdeJAbdW_bXJhclA3yN45iwcP4kpqkaspFLEJAg.TeEwjmB0EDj7ll3uQVR4GRw5IRVCpQ8-iiibQEMf-KYg.PNG/a_f82951f1984b404db30b9c4fca4bd695.png"
                width={40}
                height={40}
                alt=""
              />
            </div>
            <div>
              <div className="text-sm flex gap-1">
                <p className="font-semibold">창고보관</p>
                <p>첫 30일 무료</p>
              </div>
              <div className="text-sm text-gray-400">
                배송 없이 창고에 보관 ・ 빠르게 판매 가능
              </div>
            </div>
          </div>
          <div className="h-20 flex justify-center items-center bg-black mt-5">
            <img
              className="h-20"
              src="https://kream-phinf.pstatic.net/MjAyMjEwMjBfMjA5/MDAxNjY2MjU0Mjg1ODIz.LKarZwdDkvAwrNhfCDbZpoUkQGMtMxA9Tjw74siMzIgg.MhtRTf8nzthOBfwROA_rgyXM22gghqZD-TXpG2RGf6og.JPEG/a_18fddeaeffa04fb6963fb6e50041055c.jpg"
              alt=""
            />
          </div>
          <div className="pt-[39px]">
            <div className="pb-3 text-lg font-bold">
              구매 전 꼭 확인해주세요!
            </div>
            <div className="border-t">
              <ul>
                {[
                  "배송 기간 안내",
                  "검수 안내",
                  "구매 환불/취소/교환 안내",
                ].map((e) => (
                  <li
                    className="pt-[18px] pb-[17px] border-b flex justify-between items-center"
                    key={e}
                  >
                    <div>{e}</div>
                    <icons.DownChevron className="text-gray-500" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
/*{ 
  productId: 290,
  price: 1450000,
  nameEng: ‘Apple iPhone 14 Pro 128GB Silver (Korean Ver.)’,
  brand: ‘Apple’,
  nameKr: ‘애플 아이폰 14 프로 128기가 실버 (국내 정식 발매 제품)’,
  quickdlivery: true,
  imgUrl: ‘https://kream-phinf.pstatic.net/MjAyMjA5MjhfMTk5/MDAxNjY0MzM1MDY3ODc1.U3kxiHRzQarvxPVAyn_9nXWfCJgfGUMEf-Sj9m4sq_Yg.I-kyuffYbWkz8m7ByNbQF3LSKbSavVLLtvCyOZznahwg.JPEG/a_44b4149744b948c7857e3dc929a958e1.jpg?type=m’,
  pid: ‘78864’,
  createdAt: 2022-11-02T07:07:25.791Z
} */
