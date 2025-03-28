import { getPlaylistItem } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function MusicPlayer() {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["playlist"],
    queryFn: getPlaylistItem,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="h-[60px] w-full bg-[#212020] border-t border-[#313030]">
      <div className="h-[2px] w-full bg-[#e0e0e0] absolute top-o cursor-pointer rounded-[5px]"></div>
      <div className="h-full flex py-[5px] px-[20px]"></div>
    </div>
  );
}

export default MusicPlayer;
