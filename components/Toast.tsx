import { cls } from "../utils";
import icons from "./icons";

interface Props {
  isShow: boolean;
  message: string;
}

const Toast = ({ isShow, message }: Props) => {
  return (
    <div
      className={cls(
        "w-[468px] h-[50px] py-[6px] pr-[43px] pl-3 bg-gray-900/80 rounded-full fixed top-12 left-1/2 z-20 text-white flex justify-center items-center -translate-x-[50%]",
        isShow ? "" : "hidden"
      )}
    >
      <icons.WarnRound
        className="w-6 h-6 text-red-600 inline-block mr-[10px]"
        strokeWidth={2}
      />
      <div className="w-full h-full text-white text-sm leading-5">
        {message}
      </div>
    </div>
  );
};

export default Toast;
