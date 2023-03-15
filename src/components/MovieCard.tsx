import { MovieCardProps } from "../types/movies";

import React from 'react'

const MovieCard = ({id, title,release_date, poster_path}:MovieCardProps) => {
  const imagePath = `https://image.tmdb.org/t/p/original/${poster_path}`
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-md cursor-pointer">
      <img src={imagePath} alt=""  className="w-[100%] object-cover"/>
      <div className="text-center bg-[#1f232c] w-[100%] h-[100%] p-[6px]">
        <h1 className="font-bold">{title}</h1>
        <h1>{release_date}</h1>
      </div>
    </div>
  )
}

export default MovieCard