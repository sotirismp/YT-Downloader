import Card from "./components/UI/Card";
import {
  AiFillEye,
  AiOutlineCheck,
  AiOutlineDownload,
  AiOutlineSearch,
} from "react-icons/ai";
import { useRef, useState } from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Song from "./components/Song/Song";

function App(props) {
  const host = props.host;
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const inputRef = useRef();

  const submitHandler = async (e) => {
    const query = inputRef.current.value;
    if (query === "") return;
    if (isLoading) return;
    setSongs([]);
    setIsLoading(true);
    const response = await fetch(host + "info/" + query);
    const data = await response.json();
    setIsLoading(false);
    setSongs(data);
  };

  const onKeyHandler = async (e) => {
    if (e.keyCode === 13) submitHandler();
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-slate-300">
      <div className="font-bold  mt-10 text-4xl text-center lg:mt-20">
        Youtube Downloader
      </div>
      <div className="w-[90%] md:w-[70%] lg:w-[50%] flex flex-col items-center ">
        <Card className="mt-5 flex flex-col w-full items-center justify-center">
          <div className="text-xl text-center lg:text-2xl">
            Search the song you want to Download as MP3
          </div>
          <div className="w-full flex items-center flex-col justify-center">
            <input
              placeholder="Search here"
              ref={inputRef}
              className="h-10 mt-5 w-full rounded-lg outline-0 p-2 bg-violet-500 text-white"
              type="text"
              onKeyDown={onKeyHandler}
            />
            <button
              disabled={isLoading}
              onClick={submitHandler}
              className="w-full mt-2 flex justify-center items-center gap-2 text-white bg-purple-700 rounded-lg h-10 ease-in-out duration-200 hover:bg-purple-800 cursor-pointer"
            >
              <AiOutlineSearch />
              {"Search"}
            </button>
          </div>
        </Card>
        <div className="w-full flex flex-col items-center">
          {isLoading && <LoadingSpinner className="pt-10" />}
          {songs && songs.map((song) => <Song song={song} host={host} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
