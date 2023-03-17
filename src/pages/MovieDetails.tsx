import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { MovieDetailsObject } from '../types/movies';
import { AiFillPlayCircle, AiFillCloseCircle } from 'react-icons/ai';
import Video from '../components/Video';
const apiKey:string = import.meta.env.VITE_API_KEY

const MovieDetails = () => {
  const {movieId} = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsObject>();
  const [releaseYear, setReleaseYear] = useState("");
  const [videoURL, setVideoURL] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const backdropPath = `https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`
  const posterPath = `https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`

  useEffect(() => {
    fetchDetails();
    fetchVideoURL();
  },[])

  const fetchDetails = async() => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    const result = await data.json();
    setMovieDetails(result);
    setReleaseYear(result!.release_date.split("-")[0]);
  }

  const fetchVideoURL = async () => {
    // Tasks:
    // Add a Try Catch Block Here
    // If fetch fails, setVideoURL("")
    // If VideoURL === "", disable [ > Play Trailer] Button
    try{
      const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`)
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
    <div className="w-[100%]">
      <div
        className="movie-card" style={{"--img": `url(${backdropPath})`} as React.CSSProperties}
      >
        <div className="p-4 flex items-center gap-8 sm:w-[80%] md:w-[75%] mx-auto">
          <img src={posterPath} alt=""  className="w-[150px] sm:w-[200px] lg:w-[400px] rounded-md"/>
          <div className="text-white hidden sm:block sm:flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-bold">{movieDetails?.title} ({releaseYear})</h1>
              <h1 className="text-2xl font-bold">{movieDetails?.release_date}</h1>
              <h2 className="text-gray-300 font-bold italic">{movieDetails?.tagline}</h2>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Overview</h1>
              <p>{movieDetails?.overview}</p>
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
          <h1 className="text-4xl font-bold text-center">{movieDetails?.title} ({releaseYear})</h1>
          {videoURL !== "" && <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400 duration-300" onClick={() => togglePlayer()}>
            <AiFillPlayCircle size={30}/>
            <p>Play Trailer</p>
          </div>}
          <div className='self-start w-[100%] bg-[#12141a] py-2 px-8 border-y-[1px] border-gray-700'>
            <h1 className="text-gray-300">{movieDetails?.tagline}</h1>
            <div>
              <h1 className="text-4xl font-bold mt-2">Overview</h1>
              <p>{movieDetails?.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails