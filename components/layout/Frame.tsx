import Header from "./Header";
import { ReactNode } from "react";
import Footer from "./Footer";
import Banner from "../Banner";

interface Props {
  children: ReactNode;
}

const Frame = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="pt-28">{children}</div>
      <Footer />
    </>
  );
};

export default Frame;
