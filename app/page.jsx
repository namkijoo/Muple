import EditorMusic from "@/components/home/editorMusic";
import TopMusic from "@/components/home/topMusic";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="flex w-full  flex-col items-center  relative  overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] z-0"
      style={{
        height: "calc(100vh - 130px)",
      }}
    >
      <div className="w-full text-left  px-[30px] h-[40px] mb-[20px]">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="로고"
          className="text-left"
        />
      </div>
      <TopMusic />
      <EditorMusic />
    </div>
  );
}
