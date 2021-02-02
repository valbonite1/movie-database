import React from 'react'
import axios from 'axios';


const Genre: React.FC = () => {

  const [genres, setGenres] = React.useState([])

 const getGenre = async () => {
   const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/movies/distinct/genres`);
   const { data: data } = result.data
   console.log(data.index);
   setGenres(data)
 }

  React.useEffect(() => {
    getGenre();
  }, [])


  return (
    <>
      <h1>HellO!</h1>
        <ul>
          {genres.map((genre) =>{
            return (
            <li key={genres.indexOf(genre)}>{genre}</li>
            )
          })}
        </ul>
    </>
  )
}

export default Genre;
