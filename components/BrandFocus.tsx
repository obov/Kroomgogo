import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

function BrandFocus() {
  const router = useRouter();

  return (
    <div className="w-[1280px] h-[479px] mt-[8rem] mx-auto px-10">
      <div className="flex-row">
        <div className="text-[20px] font-semibold tracking-tighter">
          Brand Focus
        </div>
        <div className="text-[12px] text-gray-400">추천 브랜드</div>
        <div className="h-[416px] mt-[1rem] grid grid-cols-5">
          {/* map 함수가 return값이 필요해서 return 해와야 된다라고 오인 */}
          {BrandArray1.map((item, i) => (
            <div key={i}>
              <img
                className="w-[228px] ml-[4px] mr-[4px]"
                src={item?.ImageUrl}
                onClick={() =>
                  router.push({
                    pathname: `/brands/${item?.brand}`,
                    query: {
                      branditem: `${item?.brand}`,
                    },
                  })
                }
              />
              <div className="mt-[8px] mb-[8px] mr-[8px] text-[15px] flex justify-center">
                {item?.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrandFocus;

interface Brand {
  name: string;
  brand: string;
  ImageUrl: string;
}

const BrandArray1: Array<Brand | undefined> = [
  {
    name: "애플",
    brand: "Apple",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfNTMg/MDAxNjYxMTMyMzQ4Njg5.RsvtKwAj6FHj1FDDL5TY1ycECnCPB12EttYPY5M1gBsg.vpRsBYsFuP-GSd4ODRJe2P4TkiVFE9Buu6Yj777Kesog.JPEG/a_d8ca5e787c1a47f086c405177abc9694.jpg?type=m_webp",
  },
  {
    name: "루이비통",
    brand: "Louis Vuitton",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA5MzBfMTM2/MDAxNjY0NTM2NDQ2MzQ5.kC1qMK6mltl0PvSNqWiq3KroRn067Mbae-OzlEnwMEQg.jcAazVYaMq-ZB6fewYkisfqBQIIK6n6L59h_1PpKwaUg.JPEG/a_8a407a9e001a425ab4c10864c6fd273d.jpg?type=m_webp",
  },
  {
    name: "몽클레르",
    brand: "Moncler",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjEwMjhfODgg/MDAxNjY2OTU0NzIyNDEz.Tyj3Mlv3y_qMcIQduyYkE872St7VcyqP_-IfcD2So7Qg.5G1ku0ieazsqvjTm6cSe_XFNzs8_EmKyPlWut9ZfPDwg.JPEG/a_41a225143a4c453c9d8017f04cd6a067.jpg?type=m_webp",
  },
  {
    name: "아크네",
    brand: "Acne Studios",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjEwMjhfNzgg/MDAxNjY2OTU0NTgyNDYw.KLWChG-InQ3i_UOzcInspipH3cbvMiDCHCC9kpBjWUUg.e6vB8zZGmhr6WKUE3GuNaozUhuPnVxeAVSIhiLTH7LYg.JPEG/a_b4564e0bf4f34ea999cd2fe4e737f06c.jpg?type=m_webp",
  },
  {
    name: "롤렉스",
    brand: "Rolex",

    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfMTgy/MDAxNjYxMTMyMzI1ODY2.omWU_zpi2-_4IK9XyTPQFDfqADR6p8yqhK_VdchChFwg.h2JuTtFOH763vLDGZIbMj2HC53joOaME44CbdEjGaA0g.JPEG/a_080b41c445b94290b693aa53a8751fc5.jpg?type=m_webp",
  },
  {
    name: "셀린느",
    brand: "Celine",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfMTEw/MDAxNjYxMTMyNDI3Njg4.gNnZj-Nb_7BNlNaJ0KMwEoxtp1E3O_PYvNFiwz0USPEg.cVgu4uf4pB24POhPepRYihXTIG146a9_iShSKfCPFnsg.JPEG/a_ecbebc5f0f354369bac78d86766ed990.jpg?type=m_webp",
  },
  {
    name: "프라다",
    brand: "Prada",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfNTAg/MDAxNjYxMTMyNDY2ODM1.IYpY8jJHjZTN9g-Yjc9HJ3x7npeZ-0VCrMr4KApSSNMg.a_Wtikd-hRYxM1nImn9s94MVpuzoLz04JPpGOvQM52Mg.JPEG/a_1d7ab41649cc478988f6759f8d6c2bc0.jpg?type=m_webp",
  },
  /*  {
    name: "우영미",

    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfMjUy/MDAxNjYxMTMyNTE3NDkw.WBGPz7YTPljlTjBVVGNKHY8a0UohliA2ahbwJmqF4rAg.4QYXLQna4D-CHul0MSeru4vP1dcn-qRVkPDuezT3_5sg.JPEG/a_5f636bae775f4b5f8538d969e6916238.jpg?type=m_webp",
  },
  {
    name: "에르메스",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfMTU2/MDAxNjYxMTMyMjc3ODYy.o_bZ8NwB1fDxBycvBadiwSjJ3sJrAfNcgzHXZO3SCskg.U9-45gdxEevSSwnM8xAHqDBdIsBhbR4TCwK3xrBmMaIg.JPEG/a_41ee4f97c403419784fe145cbfe9e950.jpg?type=m_webp",
  },
  {
    name: "아크테릭스",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA5MzBfMjMz/MDAxNjY0NTM2NzM2Mzc1.6w2bcZkBccLv112TzFBOvWKzBsx8qE4A4Q4ODq5uz6Ig.qOOuTt5_Ch5khC3ODXUGnh1s1ErTwxg42w4fG2lzzDAg.JPEG/a_54af49e527524cdc98db28d6fb1ffade.jpg?type=m_webp",
  },
  {
    name: "렉토",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjEwMDdfMTEx/MDAxNjY1MTM0ODM4MDMw.HzVvSOi98fjQmP3oroAmNe2sR32FZDFbobzy7tjpIZ4g.reteIbS3HkHf-UxIRYF-BIHFxCpH1JrRcEFSmcJVxfMg.JPEG/a_02632df7a3a049e7b6037802a5a206b4.jpg?type=m_webp",
  },
  {
    name: "샤넬",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfODMg/MDAxNjYxMTMyMjY2NDU0.veNBMpvgteBr5I5SLuqNPHR8CkwWhEytMWZoG735frkg.PerHHfgDwBfbVU1BIwEXChh2_-w8u261iDgwUJiCp54g.JPEG/a_e37129ba9c134102b8f886ee9cfc5b57.jpg?type=m_webp",
  },
  {
    name: "디올",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfMjM2/MDAxNjYxMTMyMzE0NTg5.f8aopPNBfz2TiMXJPHCA4cDSE564M-5m_1CVOqBaMJcg.LP8fIRuj3KwekpzWqPNM1E7udU5MgzCeyeVG5hL8oFog.JPEG/a_dd2fc85edf3b45e18d1c1b83180c004c.jpg?type=m_webp",
  },
  {
    name: "스톤 아일랜드",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfMTgg/MDAxNjYxMTMyNDg5MzI4.91XVGjgCI_MCIl_wqButgXZUy7kdk_yXjOn2kg8y6AEg.dyIleHyozgiFkXvyk8pAn0SUAuz2IkwxqXxVC1Clb48g.JPEG/a_36de4c2d690d423ea5ba7a876b00ebd3.jpg?type=m_webp",
  },
  {
    name: "보테가 베네타",
    ImageUrl:
      "https://kream-phinf.pstatic.net/MjAyMjA4MjJfMTY2/MDAxNjYxMTMyNDE3MDg1.NH05zJR5hBf3wHvQNhnvKLVxlGLtXBwaLYNuxsXQL78g.B2wHGjWAx_2n6oXfK4gy92vHpu7hbjin0U_XNwa8mlcg.JPEG/a_fe6d110270b4422e9d35b90e66a3235d.jpg?type=m_webp",
  }, */
];
