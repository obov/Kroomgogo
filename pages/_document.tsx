import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

const CustomDocument = () => {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default CustomDocument;
