import { useRouter } from "next/router";

interface InforProps {
  name: string;
  url: string;
}

const Infor = ({ name, url }: InforProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(url);
  };
  return (
    <li
      onClick={handleClick}
      className="cursor-pointer motion-reduce:hidden first:mt-0 mt-3 text-gray-400 text-sm"
    >
      {name}
    </li>
  );
};

export default Infor;
