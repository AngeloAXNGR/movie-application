import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { MovieCardProps } from "../types/movies";
import MovieCard from "../components/MovieCard";
import ReactPaginate from "react-paginate";

const apiKey:string = import.meta.env.VITE_API_KEY

const Movies = () => {
  const {category} = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const useMovies = (movieCategory:string | undefined) => {
    const [movies, setMovies] = useState<MovieCardProps[]>([]);

    useEffect(() =>{
      fetchMovies();
    },[currentPage])

    const fetchMovies = async() => {
      const data = await fetch(`  https://api.themoviedb.org/3/movie/${movieCategory}?api_key=${apiKey}&language=en-US&page=${currentPage}`)
    
      const result = await data.json()
      setMovies(result.results);
      console.log(movies)
    }

    return movies;
  }

  const movieList = useMovies(category).map((movie:MovieCardProps) =>{
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


  const handlePageClick = (data:any) => {
    let pageNumber: number = data.selected + 1;
    setCurrentPage(pageNumber);
  }

  return (
    <div className="h-[100%] w-[100%] text-white min-h-[100vh] flex flex-col items-center bg-[#181b22]">
        <div className="movie-section">
        <div className="movie-gallery">
          <h1 className="gallery-heading">{category?.toUpperCase().replace("_", " ")}</h1>
          <div className="gallery-grid">
            {movieList}
          </div>
          <ReactPaginate
            className="text-white flex items-center justify-center gap-4"
            previousLabel="Prev"
            breakLabel="..."
            nextLabel="Next"
            pageCount={500}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            previousClassName="bg-[#323744] rounded-md px-2"
            nextClassName="bg-[#323744] rounded-md px-2"
            activeClassName="bg-[#ec4e24] rounded-md px-2"
          />
        </div>
      </div> 
    </div>
  )
}

export default Movies