import Infor from "../Infor";

const Footer = () => {
  const utilizeInformations = [
    { name: "검수 기준", url: "#" },
    { name: "이용 정책", url: "#" },
    { name: "패널티 정책", url: "#" },
    { name: "커뮤니티 가이드 라인", url: "#" },
  ];
  const customerSupportInformations = [
    { name: "공지사항", url: "#" },
    { name: "서비스 소개", url: "#" },
    { name: "쇼룸 안내", url: "#" },
    { name: "판매자 방문접수", url: "#" },
  ];
  return (
    <div className="w-full h-[560px] flex flex-col px-10 py-[50px] mt-10 border-t">
      <div className="w-full flex justify-between border-b">
        <div className="w-96 h-52 flex justify-between pb-16">
          <div>
            <strong>이용안내</strong>
            <ul className="pt-4">
              {utilizeInformations.map((infor) => (
                <Infor key={infor.name} {...infor} />
              ))}
            </ul>
          </div>
          <div>
            <strong>고객지원</strong>
            <ul className="pt-4">
              {customerSupportInformations.map((infor) => (
                <Infor key={infor.name} {...infor} />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-64 h-20">
          <strong>
            고객센터
            <a className="ml-1" href="tel:1588-7813">
              1588-7813
            </a>
          </strong>
          <div>
            <dl>
              <dt className="text-[13px] text-gray-400 pt-2">
                운영시간 평일 11:00 - 18:00 (토∙일, 공휴일 휴무) 점심시간 평일
                13:00 - 14:00
              </dt>
            </dl>
          </div>
          <p className="text-[13px] pt-2">
            1:1 문의하기는 앱에서만 가능합니다.
          </p>
          <div className="pt-[17px] h-[51px] font-bold text-xs">
            <a
              className="px-[14px] h-[34px] bg-slate-800 text-white inline-block leading-8"
              href="#"
            >
              자주 묻는 질문
            </a>
          </div>
        </div>
      </div>
      <div className="w-full mt-[30px] h-[95px] relative">
        <ul className="w-full pb-4 flex text-sm">
          <li className="mr-5 w-14 h-4">회사소개</li>
          <li className="mr-5 w-14 h-4">인재채용</li>
          <li className="mr-5 w-14 h-4">제휴제안</li>
          <li className="mr-5 w-14 h-4">이용약관</li>
          <li className="mr-5 w-28 h-4 font-bold">개인정보처리방침</li>
        </ul>
        <div className="absolute top-0 right-0 w-28 h-6 bg-red-200"></div>
        <div className="w-full ">
          <div>
            <dl>
              <dt className="w-[650px] h-[60px] text-[13px] text-gray-400">
                크림 주식회사 대표 김창욱
                <span className="w-[15px] inline-block"></span> 사업자등록번호 :
                570-88-01618 사업자정보확인
                <span className="w-[15px] inline-block"></span> 통신판매업 : 제
                2021-성남분당C-0093호
                <span className="w-[15px] inline-block"></span> 사업장소재지 :
                경기도 성남시 분당구 분당내곡로 131 판교테크원타워 1,8층
                <span className="w-[15px] inline-block"></span> 호스팅서비스:
                네이버클라우드 (주)
              </dt>
            </dl>
          </div>
        </div>
      </div>
      <div className="w-full mt-10 mb-2 text-xs">
        <p className="block h-4 font-bold">신한은행 채무지급보증 안내</p>
        <p className="block h-4 mt-1 text-gray-400">
          당사는 고객님의 현금 결제 금액에 대해 신한은행과 채무지급보증 계약을
          체결하여 안전거래를 보장하고 있습니다.
          <a className="ml-1 underline " href="#">
            서비스가입 사실 확인
          </a>
        </p>
      </div>
      <div className="w-full mt-3 h-8 text-gray-400 text-xs flex items-end">
        <p className="block max-w-[605px] tracking-[-.06px]">
          크림(주)는 통신판매 중개자로서 통신판매의 당사자가 아니므로 개별
          판매자가 등록한 상품정보에 대해서 책임을 지지 않습니다. 단,
          거래과정에서 검수하고 보증하는 내용에 대한 책임은 당사에 있습니다.
        </p>
        <p className="block ml-auto">© KREAM Corp.</p>
      </div>
    </div>
  );
};

export default Footer;
