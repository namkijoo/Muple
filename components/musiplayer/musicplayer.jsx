import { getPlaylistItem } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaPause } from "@react-icons/all-files/fa/FaPause";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import listIcon from "../icons/listIcon";

import YouTube from "react-youtube";
import ListIcon from "../icons/listIcon";

function MusicPlayer() {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["playlist"],
    queryFn: getPlaylistItem,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="h-[60px] flex w-full bg-[#212020] border-t border-[#313030]">
      <div className="h-[2px] w-full bg-[#e0e0e0] absolute top-0 cursor-pointer rounded-[5px]"></div>

      <div className="h-full w-full flex py-[5px] px-[20px] ">
        {Array.isArray(data) && data.length > 0 && (
          <>
            <YouTube
              key={currentAudioIndex}
              videoId={data[currentAudioIndex].snippet.resourceId.videoId}
              opts={{
                playerVars: { autoplay: 1 },
              }}
              className="hidden"
            />
            <div className="flex h-full w-[70%] flex-col justify-center">
              <span className="text-white ">
                {data[currentAudioIndex].snippet.title.length > 25
                  ? data[currentAudioIndex].snippet.title.slice(0, 25) + "..."
                  : data[currentAudioIndex].snippet.title}
              </span>
              <span className="text-white text-[12px]">
                {data[currentAudioIndex].snippet.videoOwnerChannelTitle}
              </span>
            </div>
          </>
        )}
        <div className="flex items-center justify-center h-full">
          <FaAngleLeft className="text-white text-xl cursor-pointer  mx-[10px]" />
          <FaPause className="text-white text-xl mx-[10px]" />
          <FaAngleRight className="text-white text-xl mx-[10px]" />
          <ListIcon className="w-[25px] h-[25px] cursor-pointer text-white text-xl mt-[2px]" />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
