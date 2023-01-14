import { useState } from "react";
import {
  AiFillEye,
  AiOutlineCheck,
  AiOutlineDownload,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import Card from "../UI/Card";

function Song(props) {
  const song = props.song;
  const host = props.host;

  var date = new Date(0);
  date.setSeconds(song.lengthSeconds); // specify value for SECONDS here
  var timeString = date.toISOString().substring(11, 19);
  while (true) {
    if (timeString[0] === "0" || timeString[0] === ":") {
      timeString = timeString.substring(1);
    } else {
      break;
    }
  }

  return (
    <Card className="my-2 px-5">
      <div className="flex flex-col lg:flex-row ">
        <div className="w-[100%] lg:w-[30%] relative">
          <a href={song?.url} target="_blank">
            <img className="w-full h-full" src={song?.thumbnail}></img>
            <div className="absolute bottom-0 right-0  bg-black bg-opacity-80 text-white text-sm m-1 px-1 rounded">
              {timeString}
            </div>
          </a>
        </div>
        <div className="w-[100%] flex flex-col relative lg:w-[70%] lg:pl-5">
          <a href={song?.url} target="_blank">
            <div className="font-bold text-lg  lg:mb-3">{song?.title}</div>
          </a>
          <div className="w-[50%] lg:w-[25%] flex flex-col h-6 text-xs mt-2 mb-3 gap-1 text-stone-500lg:mb-0 lg:mt-0 ">
            <div className="w-full h-2 flex">
              <div
                className={`bg-green-500 h-full rounded-tl-lg rounded-bl-lg`}
                style={{
                  width: `${Math.round(
                    (song.likes * 100) / (song.likes + song.dislikes)
                  )}%`,
                }}
              ></div>
              <div
                className={`bg-red-500  h-full rounded-tr-lg rounded-br-lg`}
                style={{
                  width: `${Math.round(
                    (song.dislikes * 100) / (song.likes + song.dislikes)
                  )}%`,
                }}
              ></div>
            </div>
            <div className="flex flex-row w-full justify-around text-stone-500">
              <div className="flex items-center gap-1">
                <AiFillLike />
                {song.likes.toLocaleString("el-GR")}
              </div>
              <div className="flex items-center gap-1">
                <AiFillDislike />
                {song.dislikes.toLocaleString("el-GR")}
              </div>
            </div>
          </div>
          <div className="text-xs flex text-stone-500 items-center "></div>
          <div className="flex justify-between mt-auto lg:">
            <div className="text-xs flex flex-col text-stone-500 bottom-0 ">
              <div className="flex items-center">
                <AiFillEye />
                <div className="font-semibold ml-1">
                  {parseInt(song?.views).toLocaleString("el-GR")}
                </div>
              </div>
              <div className="flex items-center">
                <AiOutlineCheck />
                <div className="font-semibold ml-1">{song?.published}</div>
              </div>
            </div>
            <a
              target="_blank"
              without
              rel="noreferrer"
              href={`${host}download/${song?.id}`}
              className="flex items-center gap-1 bottom-0 right-0 bg-violet-700 px-4 py-2 rounded-md text-white"
            >
              <AiOutlineDownload />
              Download
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Song;
