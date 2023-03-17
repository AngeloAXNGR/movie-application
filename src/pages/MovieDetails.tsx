import {useParams} from 'react-router-dom';

const MovieDetails = () => {
  const {movieId} = useParams();

  return (
    <div>Movie ID: {movieId}</div>
  )
}

export default MovieDetails