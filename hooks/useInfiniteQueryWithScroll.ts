import React, { ReactElement, ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { AnyObject } from "immer/dist/internal";
import axios from "axios";

// import { DEFAULT_SEARCH_QUANTITY, SearchType } from "@type/web/event";

// import { getEventList } from "@api/event/event";

interface UseInfiniteQueryWithScrollParamsTypes {
  // currentSearchType: SearchType;
  queryString: AnyObject;
}

interface UseInfiniteQueryWithScrollReturnTypes {
  data: any[] | undefined;
  error: string | undefined | unknown;
  isFetching: boolean;
  ObservationComponent: () => ReactElement;
}

/**
 * 사용 기술
 * Recat query: useInfiniteQuery (https://react-query.tanstack.com/guides/infinite-queries)
 * react-intersection-observer: useInView
 */
export default function useInfiniteQueryWithScroll({
  queryString,
}: UseInfiniteQueryWithScrollParamsTypes): UseInfiniteQueryWithScrollReturnTypes {
  const getEventListWithPageInfo = async ({ pageParam = 0 }) => {
    // const { data } = await getEventList({
    //   ...queryString,
    //   startIndex: pageParam,
    // });
    const { data } = await axios("");

    const nextPage = data.length >= 100 ? pageParam + 1 : undefined;

    return {
      result: data,
      nextPage,
      isLast: !nextPage,
    };
  };

  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ["eventListData"],
    getEventListWithPageInfo,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const ObservationComponent = () => {
    const [ref, inView] = useInView();

    useEffect(() => {
      if (!data) return;

      const pageLastIdx = data.pages.length - 1;
      const isLast = data?.pages[pageLastIdx].isLast;

      if (!isLast && inView) fetchNextPage();
    }, [inView]);

    return React.createElement("div", { ref });
  };

  return {
    data: data?.pages,
    error,
    isFetching,
    ObservationComponent,
  };
}
