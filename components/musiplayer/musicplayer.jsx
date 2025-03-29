import { getPlaylistItem } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaPause } from "@react-icons/all-files/fa/FaPause";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import listIcon from "../icons/listIcon";

import YouTube from "react-youtube";
import ListIcon from "../icons/listIcon";

function MusicPlayer() {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (playerRef.current && isPlaying) {
      intervalRef.current = setInterval(updateProgress, 1000);
    } else if (!isPlaying) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentAudioIndex]);

  const onClickMusicList = useCallback((index) => {
    setCurrentAudioIndex(index);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["playlist"],
    queryFn: getPlaylistItem,
    staleTime: 1000 * 60 * 5,
  });
  const playNextAudio = useCallback(() => {
    setCurrentAudioIndex((prevIndex) =>
      prevIndex < data.length - 1 ? prevIndex + 1 : 0
    );
  }, [data]);

  const playPrevAudio = useCallback(() => {
    setCurrentAudioIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - 1
    );
  }, [data]);

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying((prevState) => !prevState);
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;

    playerRef.current.addEventListener("onStateChange", onPlayerStateChange);

    playerRef.current.playVideo();
  };
  useEffect(() => {
    console.log("isPlaying:", isPlaying);
  }, [isPlaying]);

  const onPlayerStateChange = (event) => {
    console.log("Player state changed:", event.data);

    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (
      event.data === YT.PlayerState.PAUSED ||
      event.data === YT.PlayerState.ENDED
    ) {
      setIsPlaying(false);
    }
  };

  const onPlayerEnd = () => {
    playNextAudio();
  };

  const onProgressBarClick = (e) => {
    if (playerRef.current) {
      const rect = e.target.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const newProgress = (clickPosition / rect.width) * 100;
      const newTime = (playerRef.current.getDuration() * newProgress) / 100;
      playerRef.current.seekTo(newTime, true);
      setProgress(newProgress);
    }
  };

  const updateProgress = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.getCurrentTime === "function" &&
      typeof playerRef.current.getDuration === "function"
    ) {
      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();

      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  return (
    <div className="h-[60px] flex w-full bg-[#212020] border-t border-[#313030]">
      <div className="h-[3px] w-full bg-[#e0e0e0] absolute top-0 cursor-pointer rounded-[5px]">
        <div
          className="bg-[#3b5998] h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="h-full w-full flex py-[5px] px-[20px] transition-all duration-100 ease-in-out">
        {Array.isArray(data) && data.length > 0 && (
          <>
            <YouTube
              key={currentAudioIndex}
              videoId={data[currentAudioIndex].snippet.resourceId.videoId}
              opts={{
                playerVars: { autoplay: 1 },
              }}
              style={{ display: "none" }}
              onReady={onPlayerReady}
              onEnd={onPlayerEnd}
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
          <FaAngleLeft
            className="text-white text-xl cursor-pointer  mx-[10px]"
            onClick={playPrevAudio}
          />
          {isPlaying ? (
            <FaPause
              className="text-white text-xl mx-[10px] cursor-pointer"
              onClick={togglePlayPause}
            />
          ) : (
            <FaPlay
              className="text-white text-xl mx-[10px] cursor-pointer"
              onClick={togglePlayPause}
            />
          )}

          <FaAngleRight
            className="text-white text-xl mx-[10px] cursor-pointer"
            onClick={playNextAudio}
          />
          <ListIcon className="w-[25px] h-[25px] cursor-pointer text-white text-xl mt-[2px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
