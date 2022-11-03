import { ReactNode, useEffect, useState } from "react";
import { cls } from "../utils";
interface Props {
  isShow: boolean;
  setIsShow: Function;
  children: ReactNode;
}
const Modal = ({ isShow, setIsShow, children }: Props) => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isShowChildren, setIsShowChildren] = useState(false);
  useEffect(() => {
    if (isShow) {
      setIsTransparent(false);
      setIsShowChildren(true);
    }
  }, [isShow]);
  const handleTransitionEnd = () => {
    if (isTransparent) {
      setIsShow(false);
    }
  };
  const handleClickBackGround = () => {
    setIsTransparent(true);
    setIsShowChildren(false);
  };
  return isShow ? (
    <>
      <div
        className={cls(
          "fixed top-0 left-0 w-full h-full bg-stone-900 transition-all duration-500 z-20",
          isTransparent ? "opacity-0" : "opacity-40"
        )}
      ></div>
      <div
        onClick={handleClickBackGround}
        className={cls(
          "fixed top-0 left-0 w-full h-full transition-all duration-500 z-20",
          isTransparent ? "backdrop-blur-0" : "backdrop-blur-sm"
        )}
        onTransitionEnd={handleTransitionEnd}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        {isShowChildren && children}
      </div>
    </>
  ) : null;
};

export default Modal;
