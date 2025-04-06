"use client";

import MusicBoxItem from "./musicboxItem";

const recommendedMusic = [
  {
    title:
      "Leellamarz - 거리에서 (feat. ASH ISLAND) [Official Audio] (ENG/JPN/CHN)",
    artist: "Ambition Musik",
    imgUrl: "https://i.ytimg.com/vi/fuz2F8GGQKI/mqdefault.jpg",
  },
  {
    title:
      "TOIL-검정색하트 (Feat. leellamarz, BE′O) /가사 22.01.30 New Release Audio Lyrics",
    artist: "싸뮤 Sound Of Music",
    imgUrl: "https://i.ytimg.com/vi/hsEWDAO3zY8/mqdefault.jpg",
  },
  {
    title:
      "Lee Young Ji (이영지) - Day & Night (낮 밤) (feat. Jay Park)「Audio」",
    artist: "K-Pop ASAP",
    imgUrl: "https://i.ytimg.com/vi/e0AS9MADmEU/mqdefault.jpg",
  },
  {
    title: "NIve x Sam Kim (니브 x 샘김) - Like a Fool | Official Music Video",
    artist: "NIve",
    imgUrl: "https://i.ytimg.com/vi/J2gpmYhX3zc/mqdefault.jpg",
  },
  {
    title: "[M/V] Eldon - Pink cheeks (Lyrics ver.)",
    artist: "SUPER SOUND Bugs!",
    imgUrl: "https://i.ytimg.com/vi/G9PeH3VS4LA/mqdefault.jpg",
  },
  {
    title: "KozyPop - Sameday (Song By kenessi, Denny) (Prod. Seo Mary)",
    artist: "LINK6",
    imgUrl: "https://i.ytimg.com/vi/SBDAk5I4Ll4/mqdefault.jpg",
  },
];
function EditorMusic() {
  return (
    <div className="flex flex-col w-full p-[25px] ">
      <span className="text-amber-50 mx-[10px] text-[20px]">에디터 추천</span>
      <span className="text-[#2693bb] mx-[10px] my-[10px] text-[15px]">
        에디터가 추천하는 음악을 같이 즐겨요.
      </span>
      <div className="w-full flex flex-wrap justify-between px-2">
        {recommendedMusic.map((music, index) => (
          <MusicBoxItem
            key={index}
            title={music.title}
            artist={music.artist}
            imgUrl={music.imgUrl}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default EditorMusic;
