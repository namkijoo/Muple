"use client";
import Link from "next/link";
import HomeIcon from "../icons/homeIcon";
import MyPageIcon from "../icons/myPageIcon";
import SearchIcon from "../icons/searchIcon";
import { usePathname } from "next/navigation";
import MusicPlayer from "../musiplayer/musicplayer";

function Navigation() {
  const pathName = usePathname();
  return (
    <div className="fixed bottom-0 w-full  max-w-[480px] flex-col ">
      <MusicPlayer />
      <div className=" w-full h-[70px] flex items-center justify-around text-center border-t border-gray-300 bg-[#212020] z-[99999999999]">
        <div className="w-full flex items-center justify-center cursor-pointer">
          <Link href="/">
            <HomeIcon
              className={`w-[30px] h-[30px] ${
                pathName === "/" ? "text-[#2693bb]" : "text-white"
              } `}
              aria-label="홈"
            />
          </Link>
        </div>
        <div className="w-full flex items-center justify-center cursor-pointer">
          <Link href="/search">
            <SearchIcon
              className={`w-[30px] h-[30px] ${
                pathName === "/search" ? "text-[#2693bb]" : "text-white"
              }`}
              aria-label="검색색"
            />
          </Link>
        </div>
        <div className="w-full flex items-center justify-center cursor-pointer">
          <Link href="/auth">
            <MyPageIcon
              className={`w-[30px] h-[30px] ${
                pathName === "/auth" ? "text-[#2693bb]" : "text-white"
              }`}
              aria-label="로그인"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
