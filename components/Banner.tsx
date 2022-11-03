import { MutableRefObject, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Banner = () => {
  return (
    <div className="flex">
      <a
        href=""
        className="text-stone-50 pt-9 px-8 block bg-zinc-600 bg-right-top bg-[length:350px_200px] bg-no-repeat h-[200px] flex-1 bg-[url('https://kream.co.kr/_nuxt/img/home_banner_bottom1.79549cb.png')]"
      >
        <div className="text-xs">SERVICE GUIDE</div>
        <div className="text-base w-[300px] mt-3">
          KROOM은 처음이지?
          <br /> 서비스 소개를 확인해보세요
        </div>
        <div className="tracking-tighter text-xs mt-4 px-[7px] rounded border border-stone-50 w-[78px] h-[29px] flex justify-center items-center">
          서비스 안내
        </div>
      </a>
      <a
        href=""
        className="text-stone-50 pt-9 px-8 block bg-zinc-700 bg-right-top bg-[length:350px_200px] bg-no-repeat h-[200px] flex-1 bg-[url('https://kream.co.kr/_nuxt/img/home_banner_bottom2.0077547.png')]"
      >
        <div className="text-xs">DOWNLOAD THE APP</div>
        <div className="text-base w-[300px] mt-3">
          KROOM 앱을 설치하여
          <br /> 한정판 스니커즈를 FLEX 하세요!
        </div>
        <div className="tracking-tighter text-xs mt-4 px-[7px] rounded border border-stone-50 w-[78px] h-[29px] flex justify-center items-center">
          앱 설치하기
        </div>
      </a>
    </div>
  );
};

export default Banner;
