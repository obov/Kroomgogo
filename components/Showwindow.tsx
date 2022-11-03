import { Item } from "../types";
import ItemCard from "./ItemCard";

interface Props {
  items: Item[];
}

const Showwindow = ({ items = [] }: Props) => {
  // const items: Item[] = Array(4).fill({
  //   cartegory: "",
  //   brand: "Asics",
  //   name: "Asics x Jessica Gonsalves Gel-Nimbus 9 Cream White",
  //   price: 205000,
  //   isFast: false,
  //   imgUrl:
  //     "https://kream-phinf.pstatic.net/MjAyMjEwMjhfODgg/MDAxNjY2OTI1NDk5NzQz.QcnMiQ5-oS4nmIUgZ_fOntY7mH_EW5X5qN9prw1ktyIg.QcYJwAauPrOETxbcUT5aBlAfcNiJ_4M1E74towQlD8sg.PNG/a_879d30d9d24a429cac07d91ec6dddbb5.png?type=m_webp",
  //   color: "bg-orange-200",
  // });
  return (
    <>
      <div className="w-[1280px] px-10 mx-auto mt-10">
        <div className="text-xl font-bold">Just Droped</div>
        <div className="text-gray-400">발매상품</div>
      </div>
      <div className="w-[1280px] px-7 mx-auto flex">
        {items.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>
      <div className="w-[1280px] mx-auto">
        <a
          className="flex justify-center items-center w-28 mx-auto h-10 rounded-xl text-sm mt-5 border border-gray-300"
          href="#">
          더보기
        </a>
      </div>
    </>
  );
};

export default Showwindow;
