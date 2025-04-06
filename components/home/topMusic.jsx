"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getTopMusic } from "@/api/youtubeApi";
import Image from "next/image";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: false,
  lazyLoad: "ondemand",
};

function TopMusic() {
  const { data } = useQuery({
    queryKey: ["getTopMusic"],
    queryFn: getTopMusic,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <div className="flex flex-col w-full py-[30px] mb-[20px] px-[30px]">
      <span className="text-amber-50 mx-[10px] text-[20px]">TOP 10 추천</span>
      <span className="text-[#2693bb] mx-[10px] my-[10px] text-[15px]">
        인기있는 10개의 추천 음악을 같이 즐겨요.
      </span>

      <div>
        <Slider {...settings}>
          {data &&
            data.map((music, index) => (
              <div key={index} className="px-2">
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={music.imgUrl}
                    alt={music.title}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                    width={100}
                    height={100}
                  />
                  <div className="p-3">
                    <h3 className="text-white text-sm font-semibold line-clamp-2">
                      {music.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">{music.artist}</p>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
        <style jsx global>{`
          .slick-dots li button:before {
            color: gray;
            opacity: 0.5;
          }
          .slick-dots li.slick-active button:before {
            color: white;
            opacity: 1;
          }
        `}</style>
      </div>
    </div>
  );
}

export default TopMusic;
