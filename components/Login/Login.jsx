"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { BiUserCircle } from "@react-icons/all-files/bi/BiUserCircle";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  //클라이언트에서 로그인 구현현
  const login = useGoogleLogin({
    flow: "implicit", // 'auth-code' 대신 'implicit' 플로우 사용
    onSuccess: (tokenResponse) => {
      localStorage.setItem("token", tokenResponse.access_token);
      setIsLoggedIn(true);
    },
    onError: (errorResponse) => console.log(errorResponse),
    scope: process.env.NEXT_PUBLIC_YOUTUBE_SCOPE,
  });

  //로그아웃 하면서 토큰 삭제
  const logout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다. ");
    setIsLoggedIn(false);
  };
  return (
    <div
      className="w-full flex items-center justify-center cursor-pointer"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <div className="flex flex-col justify-center items-center text-[15px] box-border">
        <div className="flex justify-center items-center">
          <button
            className="text-[15px] text-center p-[2px] cursor-pointer rounded-[5px] bg-amber-50 flex justify-center items-center"
            type="button"
            onClick={isLoggedIn ? logout : login}
          >
            <BiUserCircle />
            {isLoggedIn ? "로그아웃" : "로그인(Click)"}
          </button>
        </div>
        <span className="text-[12px] mt-[15px] text-[#2693bb]">
          {isLoggedIn ? "" : "로그인시 음악 검색, 추가, 삭제가 가능해집니다."}
        </span>
      </div>
    </div>
  );
}

export default Login;
