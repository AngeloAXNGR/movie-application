import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieCardProps } from '../types/movies';
import MovieCard from '../components/MovieCard';
const apiKey:string = import.meta.env.VITE_API_KEY


const Home = () => {

  const navigate = useNavigate();

  const useMovies = (category:string) => {
    const [movies, setMovies] = useState<MovieCardProps[]>([])

    useEffect(() => {
      fetchMovies();
    },[])

    const fetchMovies = async() => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US`)
      const result = await data.json()
      setMovies(result.results);
    }

    return movies;
  }

  const popularMovies = useMovies("popular").map((movie:MovieCardProps) =>{
    return(
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title} 
        release_date={movie.release_date}
        poster_path={movie.poster_path}
      />
    )
  })

  const topRatedMovies = useMovies("top_rated").map((movie:MovieCardProps) =>{
    return(
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        release_date={movie.release_date}
        poster_path={movie.poster_path}
      />
    )
  })

  const currentlyAiring = useMovies("now_playing").map((movie:MovieCardProps) =>{
    return(
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        release_date={movie.release_date}
        poster_path={movie.poster_path}
      />
    )
  })

  const navigateTo = (category:string) => {
    navigate(`/movies/${category}`)
  }
  
  return (
    <div className="h-[100%] w-[100%] text-white min-h-[100vh] flex flex-col items-center bg-[#181b22]">
      <div className="movie-section">
        <div className="movie-gallery">
          <h1 className="gallery-heading">Popular</h1>
          <div className="gallery-grid">
            {popularMovies}
          </div>
          <button className="gallery-button" onClick={() => navigateTo("popular")}>Show More</button>
        </div>
      </div> 

      <div className="movie-section bg-[#282c37]">
        <div className="movie-gallery">
          <h1 className="gallery-heading">Top Rated</h1>
          <div className="gallery-grid">
            {topRatedMovies}
          </div>
          <button className="gallery-button" onClick={() => navigateTo("top_rated")}>Show More</button>
        </div>
      </div> 

      <div className="movie-section">
        <div className="movie-gallery">
          <h1 className="gallery-heading">Now Playing</h1>
          <div className="gallery-grid">
            {currentlyAiring}
          </div>
          <button className="gallery-button" onClick={() => navigateTo("now_playing")}>Show More</button>
        </div>
      </div> 
    </div>
  )
}

export default Home