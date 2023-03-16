import {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { MovieCardProps } from '../types/movies';
import MovieCard from '../components/MovieCard';

const apiKey:string = import.meta.env.VITE_API_KEY

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    for (let item of params){
      setSearchTerm(item[1].replace(" ", "+"))
    }
  },[])

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (data:any) => {
    let pageNumber: number = data.selected + 1;
    setCurrentPage(pageNumber);
  }

  const useMovies = (term:string) => {
    const [movies, setMovies] = useState<MovieCardProps[]>([]);

    useEffect(() =>{
      fetchMovies();
    },[currentPage, term])

    const fetchMovies = async() => {
      const data = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=75c38a7ffe024345943e16d835f925ef&language=en-US&query=${term}&page=${currentPage}`)
      const result = await data.json()
      setMovies(result.results);
      console.log(movies)
    }

    return movies;
  }
  console.log(searchTerm);

  const movieList = useMovies(searchTerm).map((movie:MovieCardProps) =>{
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


  return (
    <div className="h-[100%] w-[100%] text-white min-h-[100vh] flex flex-col items-center bg-[#181b22]">
        <div className="movie-section">
        <div className="movie-gallery">
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

export default Search