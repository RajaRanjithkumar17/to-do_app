import { Input } from "antd";

const SearchInput: React.FC<any> = ({ placeholder, className, onChange, search, width = "250px" }) => {
  const containerWidth = width ? `w-[${width}]` : "w-[250px]";
  return (
    <div className="relative mr-5">
      <Input type="text" placeholder={placeholder} value={search} className={`${containerWidth} h-[48px] pl-10 text-[16px] ${className}`} onChange={onChange} />
      <span className="material-symbols-outlined text-[#000] absolute left-2 top-3 cursor-pointer">search</span>
    </div>
  );
};

export default SearchInput;
