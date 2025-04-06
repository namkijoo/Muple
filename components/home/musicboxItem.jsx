"use client";
import Image from "next/image";
import React from "react";

const MusicBoxItem = ({ title, artist, imgUrl }) => {
  return (
    <div className="w-full h-[50px] bg-[#494949] my-[10px] flex items-center rounded-md">
      <Image
        src={imgUrl}
        loading="lazy"
        alt={title}
        className="w-[45px] h-[45px] rounded-[10%] ml-[5px] mr-[5px]"
        width={100}
        height={100}
      />
      <div className="flex flex-col justify-center">
        <span className="text-white text-[15px] leading-snug">
          {title.length > 30 ? `${title.slice(0, 30)}...` : title}
        </span>
        <span className="text-gray-400 text-[14px]">{artist}</span>
      </div>
    </div>
  );
};

export default MusicBoxItem;
