import Image from "next/image";
import logoApp from "@/public/logo.png";
import registerIcon from "@/public/icons/register.png";
export default function Header() {
  return (
    <div className="w-full py-2 px-6 bg-header flex justify-between items-center">
      <div className="flex flex-row justify-center items-center gap-2">
        <Image
          src={logoApp}
          alt="Melody Box Logo"
          width={66}
          height={66}
          className="ml-5"
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-1 bg-secondary py-1 px-1.5 rounded-full">
        <button className="bg-main-text hover:cursor-pointer transition-all duration-300 px-8 py-2 rounded-full text-sm text-white font-bold">
          Đăng Nhập
        </button>
        <button className="group flex justify-center items-center gap-1 px-8 py-2 hover:cursor-pointer hover:rounded-full transition-all duration-500 hover:bg-thirst-text text-white-1 text-sm font-bold">
          <div className="transition-all duration-500 brightness-0 filter invert group-hover:brightness-100">
            <Image
              src={registerIcon}
              alt="Register Icon"
              width={14}
              height={14}
            />
          </div>

          <p className="transition-all duration-500 group-hover:text-white">
            Đăng Ký
          </p>
        </button>
      </div>
    </div>
  );
}
