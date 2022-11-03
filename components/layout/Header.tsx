import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();
  const handleClickLogin = () => {
    router.push("/login");
  };
  const handleClickLogo = () => {
    router.push("/");
  };
  return (
    <div className="fixed z-10 bg-white">
      <div className="flex w-screen h-[2.1rem] p-[8px] border-solid border-b items-center justify-end">
        <div className="flex items-stretch flex-row text-[0.8rem]">
          <div className="mr-[1.4rem]">고객센터</div>
          <div className="mr-[1.4rem]">관심상품</div>
          <div className="mr-[1.4rem]">마이페이지</div>
          <div onClick={handleClickLogin} className="mr-[1.8rem]">
            로그인
          </div>
        </div>
      </div>
      <div className="flex marker:w-screen h-[4.8rem] border-solid border-b justify-between items-center">
        <div onClick={handleClickLogo} className="ml-[3rem]">
          <img src="/kroom.png" alt="kloom" />
        </div>
        <div className="flex items-stretch flex-row justify-end">
          <div className="mr-[2rem] text-[1.4rem]">STYLE</div>
          <div className="mr-[2rem] text-[1.4rem]">SHOP</div>
          <div className="mr-[2rem] text-[1.4rem]">ABOUT</div>
          <div className="mr-[2rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-9 h-9">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
