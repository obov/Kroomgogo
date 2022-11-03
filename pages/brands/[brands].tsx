import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { cls } from "../../utils";
import { Item } from "../../types";

/* interface */
interface NavStates {
  isFadeout: boolean;
  to: string;
}

interface FilterStates {
  isCategory: Boolean;
  isBrand: Boolean;
  isGender: Boolean;
  isCollect: Boolean;
  isSize: Boolean;
  isPrice: Boolean;
}

/* 1층 */
interface GroupType {
  title: string;
  subTitle: string;
  isToggle: boolean;
  body: SubMenu[];
}

/* 2층  */
interface SubMenu {
  name: string;
  isClick: boolean;
  /* 옵셔널 기능으로 반드시 있어야되는 요소가 아님을 설정 */
  sub?: SubMenu[] | undefined;
}
const MyGroup: Array<GroupType> = [
  {
    title: "카테고리",
    subTitle: "모든 카테고리",
    isToggle: true,
    body: [
      {
        name: "신발",
        isClick: false,
        sub: [
          { name: "스니커스", isClick: false },
          { name: "로퍼/플랫", isClick: false },
          { name: "부츠", isClick: false },
        ],
      },
      {
        name: "의류",
        isClick: false,
        sub: [
          { name: "자켓", isClick: false },
          { name: "후드", isClick: false },
          { name: "스웨트셔츠", isClick: false },
          { name: "니트웨어", isClick: false },
          { name: "긴팔 티셔츠", isClick: false },
          { name: "반팔 티셔츠", isClick: false },
          { name: "코트", isClick: false },
          { name: "바지", isClick: false },
          { name: "반바지", isClick: false },
        ],
      },
      {
        name: "패션잡화",
        isClick: false,
        sub: [
          { name: "스몰레더", isClick: false },
          { name: "가방", isClick: false },
          { name: "모자", isClick: false },
          { name: "스카프", isClick: false },
        ],
      },
    ],
  },

  {
    title: "브랜드",
    subTitle: "모든 카테고리",
    isToggle: false,

    body: [
      {
        name: "Acne Studios",
        isClick: false,
      },
    ],
  },
  {
    title: "성별",
    subTitle: "모든 성별",
    isToggle: false,

    body: [
      {
        name: "남성",
        isClick: false,
      },
      {
        name: "여성",
        isClick: false,
      },
      {
        name: "키즈",
        isClick: false,
      },
    ],
  },
  {
    title: "컬렉션",
    subTitle: "모든 컬렉션",
    isToggle: false,

    body: [
      {
        name: "Contemporary",
        isClick: false,
      },
    ],
  },
  {
    title: "가격",
    subTitle: "모든 컬렉션",
    isToggle: false,

    body: [
      {
        name: "10만원 이하",
        isClick: false,
      },
      {
        name: "10만원 - 30만원",
        isClick: false,
      },
      {
        name: "30만원 - 50만원",
        isClick: false,
      },
      {
        name: "50만원 이상",
        isClick: false,
      },
    ],
  },
];

function Brands() {
  const router = useRouter();
  const brandName = router.query;
  const { data: res, isLoading } = useQuery(["products"], async () => {
    const { data } = await axios.get(
      `/api/getProduct?brands=${
        brandName.branditem
      }&priceNum=${0}&quickDelivery=${"all"}&numOfRow=${20}&pageNo=${1}`
    );
    return data;
  });

  const { refetch } = useInfiniteQuery({});
  console.log(res);
  console.log(brandName.branditem);

  const [navStates, setNavStates] = useState({ isFadeout: true, to: "" });

  /* const [isToggle, setIsToggle] = useState<MyGroup>({ isToggle: }) */

  /* 필터 값을 보낼때 query로 보냄 */

  /* radio 는 취소가 안되므로 취소가 가능한 checkbox
  state 값에 하나가 들어가고 checkbox == 1 / checkbox == 0 setState false 
  key 값으로 통일 */

  return (
    /* Total Container */
    <div className="w-[1280px] mt-[2rem] mb-[40px] mx-auto px-10">
      {/* Top */}
      <div className="mt-[40px] mx-auto">
        <div className="text-[32px] text-[#222222] font-bold flex justify-center">
          {res?.data[0].brand}
        </div>
        <div className="text-[12px] text-[#22222280] flex justify-center">
          상품923
        </div>
      </div>

      {/* Middle */}
      <div className="max-w-[1280px] pl-[10px] pb-[10px] border-solid border-b">
        <button className="inline-block h-[38px] text-[14px] mr-[8px] py-[10px] px-[12px] bg-[#f4f4f4] rounded-xl align-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
        <button className="inline-block h-[38px] text-[14px] mr-[8px] py-[10px] px-[12px] bg-[#f4f4f4] rounded-xl align-top">
          신발
        </button>
        <button className="inline-block h-[38px] text-[14px] mr-[8px] py-[10px] px-[12px] bg-[#f4f4f4] rounded-xl align-top">
          패션잡화
        </button>
        <button className="inline-block h-[38px] text-[14px] mr-[8px] py-[10px] px-[12px] bg-[#f4f4f4] rounded-xl align-top">
          라이프
        </button>
      </div>

      {/* Bottom (filter + betweenBtn + items) */}
      <div className="flex box-border relative my-0 mx-auto">
        {/* filter container */}
        <form className="w-[210px] mr-[10px] pr-[10px] box-border justify-between items-center cursor-pointer">
          <div className="m-0 pt-[23px] pb-[15px] text-[#222222] text-[14px] font-bold justify-between items-center">
            필터
          </div>

          {/* 카테고리 & 모든 카테고리 */}
          {/* 1층 배열 */}

          {MyGroup.map((firstFloor) => (
            <div
              key={firstFloor.title}
              className="box-border border-solid border-b border-[#ebebeb]">
              <div className="flex m-0 py-[16px] box-border justify-between items-center">
                <div className="flex flex-column cursor-pointer">
                  {/* 카테고리 */}
                  <span className="text-[13px] text-[#222222] font-bold absolute">
                    {firstFloor.title}
                  </span>
                  {/* 카테고리 하단 서브 타이틀 */}
                  {firstFloor.isToggle ? (
                    <div className="m-0 p-0 pb-[24px] box-border">
                      {/* 2층 배열 */}
                      <div>
                        <ul className="m-0 p-0 max-h-[315px] text-[14px] overflow-y-hidden box-border list-none">
                          {firstFloor.body?.map((secondFloor) => (
                            <div key={secondFloor.name}>
                              <li className="list-none">
                                {/* 1st checkbox */}
                                <label className="relative flex items-center cursor-pointer">
                                  <input
                                    className="w-[16px] h-[16px] overflow-hidden absolute clip-0 peer"
                                    type="checkbox"
                                    name="category1"
                                    value="shoes"
                                  />
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="white"
                                    strokeWidth="1.3"
                                    className="w-[16px] h-[16px] border peer-checked:bg-black flex justify-center items-center">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.5 12.75l6 6 9-13.5"
                                    />
                                  </svg>
                                </label>

                                <div className="m-0 pt-[16px] pb-[6px] pr-[25px] text-[14px] list-none">
                                  <span className="pl-2">
                                    {secondFloor.name}
                                  </span>
                                </div>
                              </li>
                              <ul>
                                {secondFloor.sub?.map((thirdFloor) => (
                                  <li key={thirdFloor.name}>
                                    <label className="relative flex items-center cursor-pointer">
                                      <input
                                        className="w-[16px] h-[16px] overflow-hidden absolute clip-0 peer"
                                        type="checkbox"
                                        name="category1"
                                        value="shoes"
                                      />
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                        strokeWidth="1.3"
                                        className="w-[16px] h-[16px] border peer-checked:bg-black flex justify-center items-center">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M4.5 12.75l6 6 9-13.5"
                                        />
                                      </svg>
                                    </label>
                                    <div className="m-0 pt-[16px] pb-[6px] pr-[25px] text-[14px] list-none">
                                      <span className="pl-2">
                                        {thirdFloor.name}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <span className="mt-[24px] text-[15px] text-[#22222280] tracking-[-.15px] truncate">
                      {firstFloor.subTitle}
                    </span>
                  )}
                </div>

                {/* + btn */}
                <div className="m-0 p-0 h-[20px] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </div>
              </div>

              {/* filter box (isToggle == 1) */}
            </div>
          ))}
        </form>
        {/* betweenBtn + items */}
        <div className="flex-1 box-border m-0 p-0">
          <div className="pt-[16px] px-[10px] justify-between flex">
            {/* 빠른배송 & 브랜드배송*/}
            <div>
              <button className="inline-flex w-[88px] h-[28px] text-[13px] mr-[8px] pt-1 px-[9px] bg-[#00000001] border-solid border-[#ebebeb]  border-[1px] rounded-[17px] align-top">
                <img
                  className="w-[10px] h-[12px] mt-[4px] mr-[2px]"
                  src="https://kream.co.kr/_nuxt/img/ico-express.8dac9dc.svg"
                  alt="kream"
                />
                빠른배송
              </button>
              <button className="inline-flex w-[88px] h-[28px] text-[13px] mr-[8px] pt-1 px-[9px] bg-[#00000001] border-solid border-[#ebebeb]  border-[1px] rounded-[17px] align-top">
                브랜드배송
              </button>
            </div>

            {/* 인기순 */}
            <div className="flex items-center flex-row font-bold cursor-pointer box-border">
              인기순
              <button className="inline-flex ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mx-[auto] h-auto my-0 p-0 box-border flex justify-between">
            {/* item container */}
            <div>
              {res?.data.map((e: any) => (
                <div
                  key={e.brand}
                  className="w-[25%] mx-0 my-[20px] py-0 px-[10px] box-border align-top inline-block relative transition 0.4s ease-in-out">
                  <div className="bg-[#f4f4f4] rounded-[12px]">
                    <img src={e.imgUrl} alt="item" className="rounded-[12px]" />
                  </div>
                  <div className="m-0 pt-[9px]">
                    <p className="text-[14px] text-[#333333] font-bold leading-4 tracking-[-0.21px] underline underline-offset-[1px] box-border align-top inline-block">
                      {e.brand}
                    </p>
                    <p className="mt-[2px] text-[13px] leading-4 text-ellipsis">
                      {e.nameEng}
                    </p>
                    <p className="mt-[2px] text-[12px] text-[#22222280] leading-4 tracking-[-.06] text-ellipsis">
                      {e.nameKr}
                    </p>
                    {e.quickdlivery === true ? (
                      <div className="text-[11px] relative before:top-[4px] before:left-[3.5px] before:content-[''] before:absolute before:block before:h-[15px] before:w-[11px] before:bg-[url(https://kream.co.kr/_nuxt/img/ico-express.8dac9dc.svg)] text-green-400 py-[4.5px] pr-[5.5px] pl-[17px] inline-block">
                        빠른배송
                      </div>
                    ) : null}
                    <span className="m-0 p-0 text-[14px] text-[#222222] leading-[17px] font-bold box-border flex">
                      {e.price}
                    </span>
                    <p className="m-0 p-0 box-border text-[11px] text-[#22222280] leading-[13px]">
                      즉시 구매가
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Brands;
