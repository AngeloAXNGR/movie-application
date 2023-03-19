import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { MovieDetailsObject } from '../types/movies';
import Overview from '../components/Overview';
const apiKey:string = import.meta.env.VITE_API_KEY

const MovieDetails = () => {
  const {movieId} = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsObject>();
  const [releaseYear, setReleaseYear] = useState("");

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
    console.log(result);
  }


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
    </div>
  )
}

export default MovieDetails