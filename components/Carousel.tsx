import icons from "./icons";
import { useState, useEffect, useCallback, MouseEvent } from "react";
import { cls, cycler } from "../utils";
import { Picture } from "../types";

interface Props {
  pictures: Picture[];
}

interface GroupType {
  title: string;
  subTitle: string;
  body: SubMenu[];
}
interface SubMenu {
  name: string;
  isClick: boolean;
  sub?: SubMenu[];
}
const mygroup: GroupType = {
  title: "카테고리",
  subTitle: "모든 카테고리",
  body: [
    {
      name: "신발",
      isClick: false,
      sub: [
        { name: "스니커스", isClick: false },
        { name: "로퍼", isClick: false },
        { name: "부츠", isClick: false },
      ],
    },
    {
      name: "의류",
      isClick: false,
      sub: [
        { name: "", isClick: false },
        { name: "", isClick: false },
      ],
    },
  ],
};

const Carousel = ({ pictures }: Props) => {
  const [selected, setSelected] = useState(0);
  const [dragState, setDragState] = useState({
    startPoint: 0,
    isDragging: false,
    isFlipped: false,
  });
  const pictureCycler = cycler(pictures?.length ?? 0);
  const handleChangeLeft = () => {
    setSelected((cur) => pictureCycler(cur - 1));
  };
  const handleChangeRight = () => {
    setSelected((cur) => pictureCycler(cur + 1));
  };
  const handleClickPicture =
    (selected: number) => (event: MouseEvent<HTMLElement>) => {
      console.log(selected);
      console.log("event.target : ", event);
    };

  const nextImage = useCallback(() => {
    setSelected((cur) => pictureCycler(cur + 1));
  }, []);
  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDrag = (e: MouseEvent<HTMLElement>) => {
    if (dragState.isFlipped) return;
    if (e.nativeEvent.screenX - dragState.startPoint < -50) {
      setSelected((cur) => pictureCycler(cur + 1));
      setDragState((cur) => ({
        ...cur,
        isFlipped: true,
      }));
    } else if (e.nativeEvent.screenX - dragState.startPoint > 50) {
      setSelected((cur) => pictureCycler(cur - 1));
      setDragState((cur) => ({
        ...cur,
        isFlipped: true,
      }));
    }
  };
  const handleDragStart = (e: MouseEvent<HTMLElement>) => {
    setDragState(() => ({
      isFlipped: false,
      isDragging: true,
      startPoint: e.nativeEvent.screenX,
    }));
  };
  const handleDragEnd = (e: MouseEvent<HTMLElement>) => {
    setDragState((cur) => ({
      ...cur,
      isDragging: false,
    }));
  };
  const handleClickIndicator = (index: number) => () => {
    setSelected(index);
  };
  return (
    <div
      onClick={handleClickPicture(selected)}
      className={cls(
        "relative w-full min-h-[480px]",
        dragState.isDragging ? "cursor-grabbing" : "cursor-pointer" //질문하기 cusor-grabbing 적용하려면?
      )}
      onMouseMove={() => {}}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {pictures.map((picture, i) => (
        <img
          key={picture.urls}
          src={picture.urls}
          className={cls(
            "absolute w-full h-full duration-200 ease-linear transition-all object-contain",
            picture.color,
            i > selected ? "opacity-0" : "opacity-100 "
          )}
        />
      ))}

      <div className="absolute w-full flex justify-between top-1/2">
        <icons.LeftChevron
          className="text-white w-20 h-20 flex justify-center items-center cursor-pointer"
          onClick={handleChangeLeft}
        />
        <icons.RightChevron
          className="text-white w-20 h-20 flex justify-center items-center cursor-pointer"
          onClick={handleChangeRight}
        />
      </div>
      <ul className="absolute w-full flex justify-center gap-3 bottom-8">
        {pictures.map((picture, i) => (
          <li
            key={picture.urls}
            className={cls(
              "w-2 h-2 rounded-full duration-200 ease-linear transition-all",
              i === selected ? "bg-slate-600" : "bg-slate-200"
            )}
            onClick={handleClickIndicator(i)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
