export type MovieCardProps = {
  id: string,
  title: string,
  release_date: string,
  poster_path: string,
}

export type MovieCasts = {
  name:string,
  character:string,
  profile_path:string,
}

export type MovieDetailsObject = {
  id: string,
  title: string,
  release_date: string,
  poster_path: string,
  backdrop_path: string,
  overview: string,
  tagline:string,
  genre: string[]
}


export type OverviewProps = {
  id:string
  title:string,
  releaseYear: string,
  releaseDate:string,
  tagline:string,
  backdropPath: string,
  posterPath: string,
  overview: string,
}