import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { MovieDetailsObject, MovieCasts } from '../types/movies';
import PlaceholderCastPicture from '../assets/placeholder.jpg';
import Overview from '../components/Overview';
const apiKey:string = import.meta.env.VITE_API_KEY

const MovieDetails = () => {
  const {movieId} = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsObject>();
  const [releaseYear, setReleaseYear] = useState("");
  const [casts, setCasts] = useState<MovieCasts[]>([]);

  const backdropPath = `https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`
  const posterPath = `https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`

  useEffect(() => {
    fetchDetails();
    fetchCredits();
  },[])

  const fetchDetails = async() => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    const result = await data.json();
    setMovieDetails(result);
    setReleaseYear(result!.release_date.split("-")[0]);
  }

  const fetchCredits = async() =>{
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`)
    const result = await data.json();
    setCasts(result.cast)
  }

  const castCards = casts.map((cast:MovieCasts)=> {
    let castPicture:any = '';
    if(!cast.profile_path){
      castPicture = PlaceholderCastPicture
    }else{
      castPicture = `https://image.tmdb.org/t/p/original/${cast.profile_path}`
    }
    return(
      <div className="basis-[200px] grow-0 shrink-0 rounded-md overflow-hidden shadow-lg flex flex-col items-center gap-4 mb-4">
        <img src={castPicture} alt=""  className="aspect-[2/3] object-cover"/>
        <div className="text-center px-4">
          <h1 className="font-bold text-2xl">{cast.name}</h1>
          <h1 className="text-xl">{cast.character}</h1>
        </div>
      </div>
    )
  })



  return (
    <div className="w-[100%]">
     {movieDetails === undefined ? 
     <div></div>
     :
     <Overview
      id={movieDetails!.id}
      title={movieDetails!.title}
      releaseDate={movieDetails!.release_date}
      releaseYear={releaseYear}
      tagline={movieDetails!.tagline}
      backdropPath={backdropPath}
      posterPath={posterPath}
      overview={movieDetails!.overview}
     />}

     <div className="sm:w-[80%] md:w-[75%] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Cast</h1>
       <div className="flex overflow-x-scroll gap-8">
        {castCards}
       </div>
     </div>
    </div>
  )

}

export default MovieDetails