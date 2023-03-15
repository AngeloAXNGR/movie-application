import { useParams } from "react-router-dom"


const Movies = () => {
  const {category} = useParams();
  
  return (
    <div>
      <h1>{category}</h1>
    </div>
  )
}

export default Movies