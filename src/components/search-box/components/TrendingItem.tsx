import Image, { StaticImageData } from "next/image";

type TrendingItemProps = {
  icon: string | StaticImageData;
  label: string;
  onClick: () => void;
};

const TrendingItem: React.FC<TrendingItemProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full py-1.5 px-2 gap-2 flex items-center bg-transparent transition-all duration-150 hover:bg-thirst-text rounded cursor-pointer"
    >
      <TrendingIcon icon={icon} />
      <p className="text-sm text-white max-w-[92.5%] truncate">{label}</p>
    </div>
  );
};

type TrendingIconProps = {
  icon: string | StaticImageData;
};

const TrendingIcon: React.FC<TrendingIconProps> = ({ icon }) => (
  <div className="filter invert brightness-0 contrast-200 saturate-150 w-5 h-5">
    <Image src={icon} alt="Icon" />
  </div>
);

export default TrendingItem;
