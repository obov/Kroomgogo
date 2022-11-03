import icons from "./icons";
import { MouseEventHandler } from "react";
import { cls } from "../utils";
import { UseFormRegister, FieldValues } from "react-hook-form";
interface Props {
  main?: boolean;
  plus?: boolean;
  minus?: boolean;
  sub?: boolean;
  detail?: boolean;
  body: string;
  className?: string;
  onClickSecond?: MouseEventHandler;
}

const Checkbox = ({
  main,
  plus,
  minus,
  sub,
  detail,
  body,
  className,
  onClickSecond,
}: Props) => {
  return (
    <div
      className={cls("flex justify-between text-sm items-center", className)}
    >
      <label className="relative flex items-center cursor-pointer">
        <input
          className="w=[0.9px] h-[0.9px] overflow-hidden absolute clip-0 peer"
          type="checkbox"
        ></input>
        <icons.Check
          className="w-6 h-6 border peer-checked:bg-black flex justify-center items-center"
          iconClassName="text-white w-4 h-4"
          strokeWidth={2.5}
        />
        <span className="pl-2">{body}</span>
      </label>
      {main && plus ? (
        <icons.Plus
          className="ml-4 w-6 h-6 cursor-pointer"
          onClick={onClickSecond}
        />
      ) : null}
      {main && minus ? (
        <icons.Minus
          className="ml-4 w-6 h-6 cursor-pointer"
          onClick={onClickSecond}
        />
      ) : null}
      {sub && detail ? (
        <a className="h-5 text-gray-400 underline text-xs cursor-pointer">
          내용 보기
        </a>
      ) : null}
    </div>
  );
};

export default Checkbox;
