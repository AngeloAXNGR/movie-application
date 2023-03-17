export type MovieCardProps = {
  id: string,
  title: string,
  release_date: string,
  poster_path: string,
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