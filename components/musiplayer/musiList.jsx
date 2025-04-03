import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import Image from "next/image";

const MusicList = ({
  prop,
  className,
  currentAudioIndex,
  onClickMusicList,
  onDeleteBtnClick,
}) => {
  if (!Array.isArray(prop) || prop.length === 0) {
    return <div className={className}>표시할 음악이 없습니다.</div>;
  }

  return (
    <div
      className={`${className} fixed top-0 px-[20px] pt-[20px] max-w-[480px] w-full overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] flex-col`}
      style={{
        height: "calc(100vh - 130px)",
        background: "linear-gradient(to bottom, #0c0c0c, #454546, #939292)",
      }}
    >
      <span className="m-[8px] mb-[20px] text-[20px] text-[white] font-bold">
        재생목록
      </span>
      {prop &&
        (prop || [])?.map((element, key) => (
          <div
            className={`p-[5px] relative flex text-white cursor-pointer ${
              currentAudioIndex === key ? "border border-gray-300" : ""
            }`}
            key={key}
            onClick={() => onClickMusicList(key)}
          >
            <Image
              src={element?.snippet?.thumbnails?.default?.url || ""}
              alt="thumbnail"
              width={50}
              height={50}
              className="h-[50px] w-[50px]"
            />
            <div className="flex flex-col justify-center max-w-[80%]">
              <span className="text-[12px] ml-[10px]">
                {element?.snippet?.title?.length > 40
                  ? element?.snippet?.title.slice(0, 40) + "..."
                  : element?.snippet?.title || "제목 없음"}
              </span>
              <span className="text-[12px] ml-[10px] text-[#a7a5a5]">
                {element?.snippet?.videoOwnerChannelTitle?.length > 40
                  ? element?.snippet?.videoOwnerChannelTitle.slice(0, 40) +
                    "..."
                  : element?.snippet?.videoOwnerChannelTitle ||
                    "채널 정보 없음"}
              </span>
            </div>
            <MdDelete
              className="absolute right-2 top-[50%] transform -translate-y-1/2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteBtnClick(element.id);
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default MusicList;
