import { getPlaylistItem } from "../../api/youtubeApi";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaPause } from "@react-icons/all-files/fa/FaPause";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import YouTube from "react-youtube";
import ListIcon from "../icons/listIcon";
import MusicList from "./musiList";

function MusicPlayer() {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [position, setPosition] = useState(true);

  // 데이터 받아오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["playlist"],
    queryFn: getPlaylistItem,
    staleTime: 1000 * 60 * 5,
  });

  // 음악 진행도 업데이트
  useEffect(() => {
    if (playerRef.current && isPlaying) {
      intervalRef.current = setInterval(updateProgress, 1000);
    } else if (!isPlaying) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentAudioIndex]);

  // 음악 이전, 다음, 멈춤 기능
  const playNextAudio = useCallback(() => {
    if (!data || data.length === 0) return;
    setCurrentAudioIndex((prevIndex) =>
      prevIndex < data.length - 1 ? prevIndex + 1 : 0
    );
  }, [data]);

  const playPrevAudio = useCallback(() => {
    if (!data || data.length === 0) return;
    setCurrentAudioIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - 1
    );
  }, [data]);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying((prevState) => !prevState);
  };

  // 음악 로드 되면 재생
  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.addEventListener("onStateChange", onPlayerStateChange);
    playerRef.current.playVideo();
  };

  // 음악 재생 상태 확인
  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (
      event.data === YT.PlayerState.PAUSED ||
      event.data === YT.PlayerState.ENDED
    ) {
      setIsPlaying(false);
    }
  };

  // 음악 끝날 시 다음 음악 재생
  const onPlayerEnd = () => {
    playNextAudio();
  };

  // 프로그레스바 업데이트 및 동적 선택
  const onProgressBarClick = (e) => {
    e.stopPropagation();
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

  const onClickMusicList = useCallback((index) => {
    setCurrentAudioIndex(index);
  }, []);

  return (
    <div className="h-[60px] flex w-full bg-[#212020] border-t border-[#313030]">
      {/* 프로그레스바에만 onClick 적용 */}
      <div
        className="h-[3px] w-full bg-[#e0e0e0] absolute top-0 cursor-pointer rounded-[5px]"
        onClick={onProgressBarClick}
      >
        <div
          className="bg-[#3b5998] h-full transition-all duration-100 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="h-full w-full flex py-[5px] px-[20px] transition-all duration-100 ease-in-out">
        {isLoading ? (
          <div className="text-white flex items-center justify-center w-full">
            로딩 중...
          </div>
        ) : error ? (
          <div className="text-red-500 flex items-center justify-center w-full">
            에러 발생!
          </div>
        ) : Array.isArray(data) && data.length > 0 ? (
          <>
            <YouTube
              key="youtube-player"
              videoId={data[currentAudioIndex].snippet.resourceId.videoId}
              opts={{
                playerVars: { autoplay: 1 },
              }}
              className="hidden"
              onReady={onPlayerReady}
              onEnd={onPlayerEnd}
            />
            <div className="flex h-full w-[70%] flex-col justify-center">
              {isLoading ? (
                <>
                  <div className="w-[200px] h-[18px] bg-gray-600 animate-pulse rounded mb-1" />
                  <div className="w-[150px] h-[14px] bg-gray-700 animate-pulse rounded" />
                </>
              ) : (
                <>
                  <span className="text-white text-sm font-medium truncate max-w-[200px]">
                    {data[currentAudioIndex].snippet.title.length > 25
                      ? data[currentAudioIndex].snippet.title.slice(0, 25) +
                        "..."
                      : data[currentAudioIndex].snippet.title}
                  </span>
                  <span className="text-white text-[12px] truncate max-w-[150px]">
                    {data[currentAudioIndex].snippet.videoOwnerChannelTitle}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center justify-center h-full">
              <FaAngleLeft
                className="text-white text-xl cursor-pointer mx-[10px]"
                onClick={(e) => {
                  e.stopPropagation();
                  playPrevAudio();
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  playNextAudio();
                }}
              />
              <ListIcon
                className="w-[25px] h-[25px] text-white text-xl mt-[2px] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setPosition(!position);
                }}
              />
            </div>
          </>
        ) : (
          <div className="text-gray-400 flex items-center justify-center w-full">
            재생할 음악이 없습니다.
          </div>
        )}
      </div>
      <MusicList
        prop={Array.isArray(data) && data.length > 0 ? data : ""}
        currentAudioIndex={currentAudioIndex}
        className={position ? "hidden" : "flex"}
      />
    </div>
  );
}

export default MusicPlayer;
