// import React from 'react'
import ReactPlayer from "react-player"
import { AiFillCloseCircle } from "react-icons/ai"

type videoProps = {
  videoURL: string,
  togglePlayer: (event: React.MouseEvent<HTMLDivElement | HTMLOrSVGElement>) => void
}

const Video = ({videoURL, togglePlayer}:videoProps) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[70%] w-[95%] sm:h-[95%] sm:w-[80%] p-8">
      <AiFillCloseCircle size={50} className="fixed right-0 top-2 text-white cursor-pointer" onClick={(e) => togglePlayer(e)}/>
      <ReactPlayer
        controls={true} playing={false} url={videoURL}
        width='100%'
        height='100%'
      />
    </div>
  )
}

export default Video