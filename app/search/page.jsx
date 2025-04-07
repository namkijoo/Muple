"use client";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { useState } from "react";
import { getSearchMusicList, postMusicList } from "../../api/youtubeApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import YouTube from "react-youtube";
import { FaPause } from "@react-icons/all-files/fa/FaPause";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import Image from "next/image";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);

  const queryClient = useQueryClient();

  //usequery사용해서 데이터 가져오기, 로딩, refetch사용
  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getSearchMusicList"],
    queryFn: () => getSearchMusicList(searchTerm),
    enabled: fetchData && searchTerm.length > 0, //충족할때만 데이터 가져오기
    refetchOnWindowFocus: true,
  });

  // usemutation사용해서 데이터 추가가
  const { mutate } = useMutation({
    mutationFn: (videoId) => postMusicList(videoId),
    onSuccess: () => {
      alert("추가 되었습니다.");
      queryClient.invalidateQueries("getPlaylistItem"); //삭제하고 데이터 다시 불러오도록록
    },
    onError: () => {
      alert("잠시 후 다시 시도해주세요.");
    },
  });

  //input의value onchange
  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  //검색클릭했을때
  const handleSearchClick = () => {
    setFetchData(true);
    refetch();
  };

  //엔터로 검색
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  //검색한 음악 재생생
  const onClickMusicList = (index, videoId) => {
    setCurrentAudioIndex(index);
    setVideoId(videoId);
    setIsPlaying(true);
  };

  //음악 추가 버튼 클릭 후 confirm
  const addOnClick = async (videoId) => {
    if (!localStorage.getItem("token")) {
      alert("로그인 후 추가해주세요. ");
    } else {
      const confirmDelete = window.confirm("추가하시겠습니까?");
      if (confirmDelete) {
        try {
          mutate(videoId);
        } catch (error) {
          console.error("추가 중 에러 발생: ", error);
        }
      } else {
        alert("추가가 취소되었습니다.");
      }
    }
  };

  //음악 재생 멈추기기
  const togglePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  //음악 onready됐을때때
  const onPlayerReady = (event) => {
    setPlayer(event.target);
  };

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  //제목중 검색한 단어 포함 색 바꾸기
  const highlightSearchTerm = (title) => {
    if (!searchTerm) return title;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return title.replace(regex, `<span style=\"color: #2693bb;\">$1</span>`);
  };

  return (
    <div
      className="w-full flex flex-col px-[25px] overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <span className="text-[25px] mt-[20px] font-bold text-amber-50">
        음악 검색
      </span>
      <div className="w-full mt-[10px] flex relative items-center">
        <input
          type="search"
          onChange={onChangeSearch}
          value={searchTerm}
          onKeyDown={handleEnter}
          placeholder="검색어를 입력해주세요."
          className="h-[35px] w-full border-b-2 border-white bg-inherit text-amber-50 outline-0 pr-[20px] text-[12px]"
        />
        <FaSearch
          className="text-[15px] absolute right-0 text-[#e3e3e3] cursor-pointer"
          onClick={handleSearchClick}
        />
      </div>

      {videoId && (
        <YouTube
          videoId={videoId}
          opts={opts}
          style={{ display: "none" }}
          onReady={onPlayerReady}
        />
      )}

      <div className="w-full p-[5px] ">
        {isLoading ? (
          <div className="flex flex-col space-y-3 mt-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 animate-pulse"
              >
                <div className="bg-gray-600 w-[80px] h-[80px] rounded" />
                <div className="flex-1">
                  <div className="bg-gray-700 h-[14px] mb-2 w-[80%] rounded" />
                  <div className="bg-gray-700 h-[14px] w-[60%] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : data.length > 0 ? (
          data.map((element, index) => (
            <div
              className="w-full flex items-center my-[15px] justify-between"
              key={index}
            >
              <div className="items-center flex ">
                <Image
                  src={element.snippet.thumbnails.medium.url}
                  alt="thumbnail"
                  className="w-[80px] h-[80px] object-cover"
                  width={80}
                  height={80}
                  priority={index === 0} // 첫 번째 요소는 LCP 대상으로 우선 로딩
                />
                <span
                  className="ml-[20px] text-[13px] text-[lightgray] max-w-[180px] truncate"
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(
                      element.snippet.title.length > 40
                        ? element.snippet.title.slice(0, 40) + "..."
                        : element.snippet.title
                    ),
                  }}
                ></span>
              </div>
              <div className="flex text-[gray]">
                {currentAudioIndex === index && isPlaying ? (
                  <FaPause
                    onClick={togglePlayPause}
                    className="cursor-pointer hover:text-gray-300"
                  />
                ) : (
                  <FaPlay
                    className="cursor-pointer hover:text-gray-300"
                    onClick={() => onClickMusicList(index, element.id.videoId)}
                  />
                )}
                <FaPlus
                  className="cursor-pointer hover:text-gray-300 ml-[10px]"
                  onClick={() => addOnClick(element.id.videoId)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-[lightgray] mt-[100px] text-center">
            <div>
              <h4 className="text-[20px] mb-[10px] text-[#9bb1b9]">
                인기 검색어:
              </h4>
              <ul className="line-clamp-none p-0">
                <li className="m-x-[5px] cursor-pointer text-[gray] hover:text-[white]">
                  #Billboard
                </li>
                <li className="m-x-[5px] cursor-pointer text-[gray] hover:text-[white]">
                  #KPop
                </li>
                <li className="m-x-[5px] cursor-pointer text-[gray] hover:text-[white]">
                  #TopHits
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
