import { MovieCardProps } from "../types/movies";
import { useNavigate } from "react-router-dom";

const MovieCard = ({id, title,release_date, poster_path}:MovieCardProps) => {
  const navigate = useNavigate();
  const imagePath = `https://image.tmdb.org/t/p/original/${poster_path}`

  const navigateTo = (movieId: string) => {
    navigate(`/movie/${movieId}`)
  }
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-md cursor-pointer" onClick={() =>navigateTo(id)}>
      <img src={imagePath} alt=""  className="w-[100%] object-cover"/>
      <div className="text-center bg-[#1f232c] w-[100%] h-[100%] p-[6px]">
        <h1 className="font-bold">{title}</h1>
        <h1>{release_date}</h1>
      </div>
    </div>
  )
}

export default MovieCard