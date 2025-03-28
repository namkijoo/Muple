import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../icons/homeIcon";
// import SearchIcon from "../../assets/searchIcon.svg";
// import HomeIcon from "../../assets/homeIcon.svg";
// import MyPageIcon from "../../assets/myPageIcon.svg";

function Navigation() {
  return (
    <div className="fixed bottom-0 w-full max-w-[480px] h-[70px] flex items-center justify-around  border-t border-gray-300 z-[99999999999]">
      <HomeIcon className="text-blue-500 w-8 h-8" />
    </div>
  );
}

export default Navigation;
