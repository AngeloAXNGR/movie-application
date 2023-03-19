import { useState,useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import Video from "./Video";
import { OverviewProps } from "../types/movies";
const apiKey:string = import.meta.env.VITE_API_KEY

const Overview = ({id, title, releaseDate, releaseYear, tagline, backdropPath, posterPath, overview}:OverviewProps) => {
  const [videoURL, setVideoURL] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    fetchVideoURL();
  },[])
  const fetchVideoURL = async () => {
    try{
      const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`)
      const result = await data.json();
      const trailerURL = getTrailers(result);
      setVideoURL(`https://www.youtube.com/watch?v=${trailerURL}`)
    }catch(e){
      setVideoURL("");
    }
  }

  const getTrailers = (videos:any) => {
    const trailer = videos.results.filter(function(e:any){
      return e.type === "Trailer"
    })
    return trailer[0].key;
  }

  const togglePlayer = () => {
    setShowPlayer(prevShow => {return !prevShow})
  }

  return (
    <div>
      <div
        className="movie-card" style={{"--img": `url(${backdropPath})`} as React.CSSProperties}
      >
        <div className="p-4 flex items-center gap-8 sm:w-[80%] md:w-[75%] mx-auto">
          <img src={posterPath} alt=""  className="w-[150px] sm:w-[200px] lg:w-[400px] rounded-md"/>
          <div className="text-white hidden sm:block sm:flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-bold">{title} ({releaseYear})</h1>
              <h1 className="text-2xl font-bold">{releaseDate}</h1>
              <h2 className="text-gray-300 font-bold italic">{tagline}</h2>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Overview</h1>
              <p>{overview}</p>
            </div>
            {videoURL!== "" && <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400 duration-300" onClick={() => togglePlayer()}>
              <AiFillPlayCircle size={30}/>
              <p>Play Trailer</p>
            </div>}
          </div>
        </div>
        {showPlayer && <Video videoURL={videoURL} togglePlayer={togglePlayer}/>}
      </div>

      <div className="block sm:hidden bg-[#181b22] text-white py-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-center">{title} ({releaseYear})</h1>
          {videoURL !== "" && <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400 duration-300" onClick={() => togglePlayer()}>
            <AiFillPlayCircle size={30}/>
            <p>Play Trailer</p>
          </div>}
          <div className='self-start w-[100%] bg-[#12141a] py-2 px-8 border-y-[1px] border-gray-700'>
            <h1 className="text-gray-300">{tagline}</h1>
            <div>
              <h1 className="text-4xl font-bold mt-2">Overview</h1>
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Overview