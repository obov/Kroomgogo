import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Carousel from "../components/Carousel";
import BrandFocus from "../components/BrandFocus";
import Showwindow from "../components/Showwindow";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { useInView } from "react-intersection-observer";
import Banner from "../components/Banner";

const bannerImgs = [
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfNDYg/MDAxNjY3MTg1NDYyNjc0.2Vb7XJhsAeUUSbree2v99RMAcAG99BHoRpqtUMSxpKAg.VNOsl5UYTwzEu20AKVgdiwDuXhZYFli6dCg9St7GrbYg.JPEG/a_9a770fc5d86143a49dd2cb8b1fab7b72.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjExMDFfOTIg/MDAxNjY3MzAyMDE2ODYx.zMou_mnGPiLsORrtUnfdwxFbgl7PQyBRxnrOfeQ3ljgg.h9vf0OmEr_GSHR-Y7JXudfB9BqTyUcpKUdnyV7bpelUg.JPEG/a_412a8400e2bf4a409ff3ca77367e6ce3.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfMjM2/MDAxNjY3MTk5NzAxOTM0.4K6Bbc-eJEkV7Bewne2bZEdfVDPWWHsxhCvMYQXG04Eg.p-sHx_P22t3fBkp-br29VT7YrHWKaEU_GTXFTZOPpmMg.JPEG/a_2c07984be8754180a8d5f10834f48817.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfMTMx/MDAxNjY3MTg1ODc0Mjgx.EV4v89RbuXQoFqNG35KCzConD7MNRTjx50q8hS1itKEg.TnTQooekZZmtWSYJPLqM2UZxv0M_XsqZu7Bi-ehGjEcg.JPEG/a_0b91b248d9f94594868a60362fe76b84.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfMjI5/MDAxNjY3MTg2MDEwNjg0.3oHQzX52LozyQjWswNAFJ2Q-8733P3544sew_gXWcIgg.PLdTYwEsDSOVGdUwvB2Z8DFi0Yo3aTKWGg2OQYRcjZwg.JPEG/a_f2dbac09ff7a41c2b1a4b3aa5dcdfa11.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfMjUy/MDAxNjY3MTg2MTM0NzI4.Tum3pHOK4poSvexJGxMjJqMNz4GIxRgefWV_zyXxLB0g.qywFOCEskv_meyO3N7y6MDGz1EwdmoWDSLUM-pxKw8Eg.JPEG/a_e3e3733b24464b9480e68674d40e5c6d.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfOTcg/MDAxNjY3MTg2Mjg1Mzkx.9sazfHrPiXlE3H1rNJ-QJmhq4Gm6h9xfk6deRBv_XXog.v5-ETBfxNv4UoRd_UZwxSX3hnd2QYdMCT07nYLihpDwg.JPEG/a_59b5205aeac342a2ad0a460b9b4e0cff.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfMTA0/MDAxNjY3MTg2NDIxNzgz.W3e9jsSynIfT3F7K5w6MYYQRUpRypWyR0P0EesRVx0og.mhfz_0yWcmS1uucwlaK6czNNJxqt6kJLpRqUYY8PJuMg.JPEG/a_fb1d8feef429433ea07679d833d658d7.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfMjY4/MDAxNjY3MTg2NDk3MjA2.RUbBQrOHCWKuYwpHHWu0_-CHuGjBISweIc0ISA6PKuYg.2wG_T21f5zW-m2fnqYW6IRjEQD4y4ND6nFxp34IS1Rkg.JPEG/a_a06df9239c8348128d7fe71fc08b2210.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfNCAg/MDAxNjY3MTg2MzU1ODU0.N6cfTjjy3k8B28gJWSdtnbZ0E2jgCNNilmT53S_cxsUg.MxjzTZJi6DCxJkopiSZ3f3jWUuzOpD-Kq3QEB4DVVZYg.JPEG/a_5377b899ce674b669a247f23fcf03138.jpg?type=m_2560",
  "https://kream-phinf.pstatic.net/MjAyMjEwMzFfOTMg/MDAxNjY3MTg2MTk5MTM2.le0H2sm8Vsjyk2aoF_BbqUfCirjiLRCW6BlxhPudRxgg.0VZBAg-l-Qx7zDxLq0oaoNZfuNMALZcreDnAcrFBGZMg.JPEG/a_417c5780398b486cafea53bc300a1e2b.jpg?type=m_2560",
];
const Main = () => {
  const callLimit = bannerImgs.length;
  const [callCount, setCallCount] = useState(0);
  const { data, fetchNextPage } = useInfiniteQuery(
    ["projects"],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `/api/getProduct?brands=${"Apple"}&priceNum=${0}&quickDelivery=${"all"}&numOfRow=${4}&pageNo=${pageParam}`
      );
      console.log(res);
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => {
        return +lastPage.nextPageNo ?? undefined;
      },
    }
  );

  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && callCount < callLimit + 1) {
      fetchNextPage();
      setCallCount((cur) => cur + 1);
    }
  }, [inView]);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/test`);
      console.log(res);
      return res.data;
    })();
  }, []);
  return (
    <>
      <Carousel
        pictures={[
          {
            urls: "https://kream-phinf.pstatic.net/MjAyMjEwMjhfMjQ4/MDAxNjY2OTQ1ODIwMTkz.6yLYh2vFuhkR_8XOzOAjDbj3aud5CyT8iU3ZKKKaWq0g.U68sTnIEIcWJi728e3K6gcJXTP5J6hUiPi6owYvN-FIg.JPEG/a_d18fed90b3d04341a2644b17b7aa5ca9.jpg?type=m_2560",
            color: "bg-[#445978]",
          },
          {
            urls: "https://kream-phinf.pstatic.net/MjAyMjEwMjZfMTMx/MDAxNjY2Nzc0ODg0OTYx.1B7e-zJUcT7RWU1NyUwE3KLyOMCrMXrnN5Nc26B1X4gg.JbfxOScCqOsHBfCtkmkk_tdtGVwQuvX9Aot5aNuruAMg.JPEG/a_b834a0ef56a042818856dc8c790b338f.jpg?type=m_2560",
            color: "bg-[#d1d9e3]",
          },
          {
            urls: "https://kream-phinf.pstatic.net/MjAyMjEwMjVfMjk2/MDAxNjY2Njc0MTg4MjUz.267Afo45qoCUpMlpkDM5vLHET2lPeSP_SY4aw_KpW4sg.y2IA_VGtRgeh6Rp1pM0Y0TYUI2rRwZCw-fhPFvhy_xwg.JPEG/a_4e3ba081491a4d4bb483cb13b0471b73.jpg?type=m_2560",
            color: "bg-[#f3edf1]",
          },
          {
            urls: "https://kream-phinf.pstatic.net/MjAyMjEwMjBfMjI5/MDAxNjY2MjUxMjc3NjMy.RrbrrjlBMoQ82LIFw2Blx-qkgzbWbtqR8GLTo7CKC5sg.BkCmaZdBclZG50Sn1EbfTDLst5egSkshai1ARzzoCOUg.JPEG/a_3a2ad54b27cf49c2ac3fa6d30b0a5730.jpg?type=m_2560",
            color: "bg-[#e7dbc5]",
          },
          {
            urls: "https://kream-phinf.pstatic.net/MjAyMjA5MzBfMTgw/MDAxNjY0NTI0NDA2Mzg3.SeU4s7DVMNLbszQ05gi7FcHkm9Z31qsZHPINe_1uSikg.Pzp2bbPJnflzKQah0pyWw5JmtnHqKJbGY8xiZMEyvawg.JPEG/a_265a70b1e7c248a3b206da8d1e7d2326.jpg?type=m_2560",
            color: "bg-[#f9f9f9]",
          },
        ]}
      />
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          <Showwindow items={page.data} />
          <img className="mt-3" src={bannerImgs[i]} alt="" />
        </Fragment>
      ))}
      {/* <BrandFocus />
      <div>
      </div>*/}

      <div ref={ref}>
        <Banner />
      </div>
    </>
  );
};

export default Main;
